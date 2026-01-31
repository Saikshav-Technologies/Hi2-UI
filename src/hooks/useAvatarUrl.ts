import { useEffect, useState } from 'react';
import { getAccessToken, getUserId, getUserIdFromToken } from '@/lib/auth';
import { API_BASE_URL } from '@/lib/constants';

const isValidImageSrc = (value?: string | null): boolean => {
  if (!value) return false;
  return value.startsWith('http://') || value.startsWith('https://') || value.startsWith('/');
};

const defaultAvatar = '/images/profile/default-avatar.png';

export const useAvatarUrl = (initialAvatar?: string) => {
  const [avatarUrl, setAvatarUrl] = useState<string>(
    isValidImageSrc(initialAvatar) ? initialAvatar! : defaultAvatar
  );

  useEffect(() => {
    const fetchUserAvatar = async () => {
      try {
        const token = getAccessToken();
        const userId = getUserId() || getUserIdFromToken(token);

        if (!token || !userId) return;

        const userResponse = await fetch(`${API_BASE_URL}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!userResponse.ok) return;

        const userData = await userResponse.json();
        const key = userData?.data?.avatarUrl;

        if (!key) return;

        const response = await fetch(
          `${API_BASE_URL}/users/avatar/presigned-url/?key=${encodeURIComponent(key)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data?.url) {
            setAvatarUrl(data.data.url);
          }
        }
      } catch (error) {
        console.error('Error fetching avatar:', error);
      }
    };

    fetchUserAvatar();
  }, []);

  return { avatarUrl, setAvatarUrl };
};

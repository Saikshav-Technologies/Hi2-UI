'use client';

import { useState } from 'react';
import ToggleRow from './ToggleRow';
import { PrivacySettings } from '@/lib/types/settings';
import { userApi } from '@/lib/api/user';

interface VisibilityPrivacyCardProps {
  initialSettings?: PrivacySettings;
  onChange?: (settings: PrivacySettings) => void;
}

export default function VisibilityPrivacyCard({
  initialSettings = {
    isProfilePublic: true,
    showOnlineStatus: true,
    allowMessageRequests: false,
  },
  onChange,
}: VisibilityPrivacyCardProps) {
  const [settings, setSettings] = useState<PrivacySettings>(initialSettings);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggle = async (key: keyof PrivacySettings, value: boolean) => {
    setError(null);
    setIsLoading(true);

    try {
      const payload: Record<string, boolean> = {};

      if (key === 'isProfilePublic') {
        payload.isPrivate = !value;
      } else if (key === 'showOnlineStatus') {
        payload.showStatus = value;
      } else if (key === 'allowMessageRequests') {
        payload.allowMessageRequests = value;
      }

      await userApi.updatePrivacySettings(payload);

      // Update state only after successful API call
      const newSettings = { ...settings, [key]: value };
      setSettings(newSettings);
      onChange?.(newSettings);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update privacy settings');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white rounded-lg p-6 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#15195D] mb-2">Visibility & Privacy</h2>
        <p className="text-sm text-[#15195D]/70">
          Control who can see your activity and interact with you.
        </p>
      </div>

      {/* Error Message */}
      {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md">{error}</div>}

      {/* Toggle Options */}
      <div className="space-y-0">
        <ToggleRow
          title="Make profile public"
          description="Allow anyone to see your posts and events."
          checked={settings.isProfilePublic}
          onChange={(checked) => handleToggle('isProfilePublic', checked)}
          disabled={isLoading}
        />
        <ToggleRow
          title="Show online status"
          description="Let others know when you are active."
          checked={settings.showOnlineStatus}
          onChange={(checked) => handleToggle('showOnlineStatus', checked)}
          disabled={isLoading}
        />
        <ToggleRow
          title="Allow message requests"
          description="Receive messages from people you don't follow."
          checked={settings.allowMessageRequests}
          onChange={(checked) => handleToggle('allowMessageRequests', checked)}
          disabled={isLoading}
        />
      </div>
    </section>
  );
}

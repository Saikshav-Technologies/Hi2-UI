// TypeScript interfaces for Profile Settings page

export interface ProfileFormData {
    firstName: string;
    lastName: string;
    username: string;
    bio: string;
    birthday?: string; // ISO date format (YYYY-MM-DD)
    email: string; // Read-only, for display
}

export interface ProfileUpdateRequest {
    firstName: string;
    lastName: string;
    username: string;
    bio: string;
    birthday?: string;
    isPrivate: boolean;
}

export interface PrivacySettings {
    isProfilePublic: boolean;
    showOnlineStatus: boolean;
    allowMessageRequests: boolean;
}

export interface SettingsNavItem {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    href: string;
}

'use client';

import { useState } from 'react';
import ToggleRow from './ToggleRow';
import { PrivacySettings } from '@/lib/types/settings';

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
    onChange
}: VisibilityPrivacyCardProps) {
    const [settings, setSettings] = useState<PrivacySettings>(initialSettings);

    const handleToggle = (key: keyof PrivacySettings, value: boolean) => {
        const newSettings = { ...settings, [key]: value };
        setSettings(newSettings);
        onChange?.(newSettings);
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

            {/* Toggle Options */}
            <div className="space-y-0">
                <ToggleRow
                    title="Make profile public"
                    description="Allow anyone to see your posts and events."
                    checked={settings.isProfilePublic}
                    onChange={(checked) => handleToggle('isProfilePublic', checked)}
                />
                <ToggleRow
                    title="Show online status"
                    description="Let others know when you are active."
                    checked={settings.showOnlineStatus}
                    onChange={(checked) => handleToggle('showOnlineStatus', checked)}
                />
                <ToggleRow
                    title="Allow message requests"
                    description="Receive messages from people you don't follow."
                    checked={settings.allowMessageRequests}
                    onChange={(checked) => handleToggle('allowMessageRequests', checked)}
                />
            </div>
        </section>
    );
}

'use client';

import { User, Shield, Lock, Bell } from 'lucide-react';
import SettingsNavItem from './SettingsNavItem';

interface SettingsSidebarProps {
    activeTab?: string;
    onTabChange?: (tab: string) => void;
}

export default function SettingsSidebar({ activeTab = 'profile', onTabChange }: SettingsSidebarProps) {
    const navItems = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'privacy', label: 'Privacy', icon: Lock },
        { id: 'notifications', label: 'Notifications', icon: Bell },
    ];

    return (
        <aside className="bg-white rounded-lg p-3 h-fit">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-xl font-bold text-[#15195D] mb-1">Account Settings</h1>
                <p className="text-sm text-[#15195D]/50">
                    Manage your digital presence and preferences.
                </p>
            </div>

            {/* Navigation */}
            <nav className="space-y-1">
                {navItems.map((item) => (
                    <SettingsNavItem
                        key={item.id}
                        icon={item.icon}
                        label={item.label}
                        active={activeTab === item.id}
                        onClick={() => onTabChange?.(item.id)}
                    />
                ))}
            </nav>
        </aside>
    );
}

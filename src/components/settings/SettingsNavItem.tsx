'use client';

interface SettingsNavItemProps {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    active?: boolean;
    onClick?: () => void;
}

export default function SettingsNavItem({ icon: Icon, label, active = false, onClick }: SettingsNavItemProps) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${active
                    ? 'bg-[#131C61] text-white'
                    : 'text-[#15195D] hover:bg-gray-100'
                }`}
        >
            <Icon className="w-5 h-5" />
            <span className="text-sm font-medium">{label}</span>
        </button>
    );
}

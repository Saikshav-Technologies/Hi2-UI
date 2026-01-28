'use client';

interface ToggleRowProps {
    title: string;
    description: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export default function ToggleRow({ title, description, checked, onChange }: ToggleRowProps) {
    return (
        <div className="flex items-center justify-between py-4 border-b border-gray-200 last:border-0">
            <div className="flex-1 pr-4">
                <h3 className="text-base font-medium text-[#15195D]">{title}</h3>
                <p className="text-sm text-[#15195D]/70 mt-1">{description}</p>
            </div>
            <button
                type="button"
                onClick={() => onChange(!checked)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#37CE62] focus:ring-offset-2 ${checked ? 'bg-[#37CE62]' : 'bg-gray-300'
                    }`}
                role="switch"
                aria-checked={checked}
            >
                <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'
                        }`}
                />
            </button>
        </div>
    );
}

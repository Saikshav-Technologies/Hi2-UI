'use client';

import { useState } from 'react';

interface DeleteAccountCardProps {
    onDelete?: () => void;
}

export default function DeleteAccountCard({ onDelete }: DeleteAccountCardProps) {
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDelete = () => {
        if (showConfirm) {
            onDelete?.();
        } else {
            setShowConfirm(true);
        }
    };

    return (
        <section className="bg-white rounded-lg p-6 md:p-8">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#EF4444] mb-2">Delete Account</h2>
                <p className="text-sm text-[#15195D]/70">
                    Once you delete your account, there is no going back. Please be certain.
                </p>
            </div>

            {/* Delete Button */}
            <div className="flex justify-end">
                <button
                    onClick={handleDelete}
                    className="bg-[#EF4444] text-white px-6 py-3 rounded-full font-medium hover:bg-[#DC2626] transition-colors focus:outline-none focus:ring-2 focus:ring-[#EF4444] focus:ring-offset-2"
                >
                    {showConfirm ? 'Confirm Delete' : 'Delete My Account'}
                </button>
            </div>

            {showConfirm && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800">
                        Are you sure? This action cannot be undone. Click the button again to confirm.
                    </p>
                    <button
                        onClick={() => setShowConfirm(false)}
                        className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </section>
    );
}

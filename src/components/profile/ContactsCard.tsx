'use client';

import { Search } from 'lucide-react';
import ContactItem from './ContactItem';
import { Contact } from '@/mocks';

interface ContactsCardProps {
    contacts: Contact[];
}

export default function ContactsCard({ contacts }: ContactsCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#2c3975]">Contacts</h3>
                <button className="text-gray-500 hover:text-[#131c61] transition-colors">
                    <Search className="w-5 h-5" />
                </button>
            </div>

            {/* Contact List */}
            <div className="space-y-1">
                {contacts.map((contact) => (
                    <ContactItem
                        key={contact.id}
                        name={contact.name}
                        avatar={contact.avatar}
                        isOnline={contact.isOnline}
                    />
                ))}
            </div>

            {/* View All Link */}
            <div className="mt-4 text-center">
                <button className="text-sm font-medium text-[#131c61] hover:underline">
                    View All
                </button>
            </div>
        </div>
    );
}

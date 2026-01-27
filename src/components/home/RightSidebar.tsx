'use client';

import Image from 'next/image';
import { Phone, Search } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  image: string;
  isOnline: boolean;
}

interface Event {
  id: string;
  title: string;
  image: string;
  date: string;
  location: string;
  creator: string;
  interested: number;
}

interface FriendRequest {
  id: string;
  name: string;
  image: string;
  time: string;
  mutualFriends: string;
}

interface FriendSuggestion {
  id: string;
  name: string;
  image: string;
  mutualFriends: number;
}

const contacts: Contact[] = [
  { id: '1', name: 'Jarmal Rustam sinha', image: '/images/default-avatar.svg', isOnline: true },
  { id: '2', name: 'Jarmal Rustam sinha', image: '/images/default-avatar.svg', isOnline: true },
  { id: '3', name: 'Sweetu Jordan', image: '/images/default-avatar.svg', isOnline: true },
  { id: '4', name: 'Sweetu Jordan', image: '/images/default-avatar.svg', isOnline: true },
  { id: '5', name: 'Shaun walker', image: '/images/default-avatar.svg', isOnline: true },
  { id: '6', name: 'Sweetu Dikshka', image: '/images/default-avatar.svg', isOnline: true },
];

const events: Event[] = [
  {
    id: '1',
    title: 'Zen Mountain',
    image: '/images/login/people-group-left.png',
    date: 'FRI FEB 28 2023',
    location: 'Indonesia',
    creator: 'JK Omega',
    interested: 1,
  },
];

const friendRequests: FriendRequest[] = [
  {
    id: '1',
    name: 'Mehdia kumari',
    image: '/images/default-avatar.svg',
    time: 'sent you friend request 10m',
    mutualFriends: 'friend with sara and 5 others friends',
  },
];

const friendSuggestions: FriendSuggestion[] = [
  { id: '1', name: 'Prince', image: '/images/default-avatar.svg', mutualFriends: 0 },
  { id: '2', name: 'Sumit kumar', image: '/images/default-avatar.svg', mutualFriends: 0 },
];

export default function RightSidebar() {
  return (
    <div className="space-y-4 sticky top-20 self-start max-h-[calc(100vh-5rem)] overflow-y-auto">
      {/* Events */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Events</h3>
          <button className="text-green-600 hover:text-green-700 text-sm font-medium">
            See All
          </button>
        </div>
        {events.map((event) => (
          <div key={event.id} className="mb-3">
            <div className="relative h-32 rounded-lg overflow-hidden mb-2">
              <Image src={event.image} alt={event.title} fill className="object-cover" />
            </div>
            <div className="space-y-1">
              <p className="text-xs text-red-500 font-medium">{event.date}</p>
              <h4 className="font-semibold text-gray-900">{event.title}</h4>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Created By: {event.creator}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Location: {event.location}</span>
              </div>
              <button className="w-full bg-green-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors mt-2">
                Interested
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Friend Requests */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Friend Requests</h3>
          <button className="text-green-600 hover:text-green-700 text-sm font-medium">
            View All
          </button>
        </div>
        {friendRequests.map((request) => (
          <div key={request.id} className="mb-3">
            <div className="flex items-start space-x-3 mb-2">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                <Image
                  src={request.image}
                  alt={request.name}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-semibold text-gray-900">{request.name}</span>{' '}
                  <span className="text-gray-600">{request.time}</span>
                </p>
                <p className="text-xs text-gray-500">{request.mutualFriends}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 bg-green-500 text-white py-1.5 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
                Confirm
              </button>
              <button className="flex-1 bg-gray-200 text-gray-700 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Friend Suggestions */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Friend Suggestions</h3>
          <button className="text-green-600 hover:text-green-700 text-sm font-medium">
            View All
          </button>
        </div>
        <div className="space-y-3">
          {friendSuggestions.map((suggestion) => (
            <div key={suggestion.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src={suggestion.image}
                    alt={suggestion.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">{suggestion.name}</p>
                  <p className="text-xs text-gray-500">{suggestion.mutualFriends} Mutual Friend</p>
                </div>
              </div>
              <button className="bg-green-500 text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-green-600 transition-colors">
                Add Friend
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Contacts */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
            <Phone className="w-5 h-5" />
            <span>Contacts</span>
          </h3>
          <button className="text-gray-400 hover:text-gray-600">
            <Search className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-3">
          {contacts.map((contact) => (
            <div key={contact.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                    <Image
                      src={contact.image}
                      alt={contact.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  {contact.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <span className="text-sm font-medium text-gray-900">{contact.name}</span>
              </div>
              <button className="text-green-500 hover:text-green-600">
                <Phone className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 text-center text-sm text-green-600 font-medium hover:underline">
          View All
        </button>
      </div>
    </div>
  );
}

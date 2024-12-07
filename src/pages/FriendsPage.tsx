import React, { useState, useEffect } from 'react';

interface Friend {
  id: number;
  name: string;
  email: string;
  mutualGroups: number;
  profilePicture?: string; // Optional property for profile picture URL
}

const FriendsPage: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);

  // API integration later on -TODO
  // useEffect(() => {
  //   fetch('/api/friends') // Replace with your endpoint
  //     .then((response) => response.json())
  //     .then((data) => setFriends(data))
  //     .catch((error) => console.error('Error fetching friends:', error));
  // }, []);
  

  useEffect(() => {
    // Mock data to simulate an API response
    const mockData: Friend[] = [
      { id: 1, name: 'Alice Johnson', email: 'alice@example.com', mutualGroups: 3, profilePicture: 'https://img.icons8.com/?size=100&id=42217&fiormat=png&color=575799' },
      { id: 2, name: 'Bob Smith', email: 'bob@example.com', mutualGroups: 5, profilePicture: 'https://img.icons8.com/?size=100&id=42217&fiormat=png&color=575799'},
      { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', mutualGroups: 2, profilePicture: 'https://img.icons8.com/?size=100&id=42217&fiormat=png&color=575799' },
      { id: 4, name: 'Diana Prince', email: 'diana@example.com', mutualGroups: 4, profilePicture: 'https://img.icons8.com/?size=100&id=42217&fiormat=png&color=575799'},
    ];

    // Simulate API fetch and update state
    setFriends(mockData);
  }, []);

  return (
    <div className="p-6 bg-white rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Check out all your friends!</h2>
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-6">Your Friends List</h3>
        <div className="space-y-4">
          {friends.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center bg-gray-100 p-4 rounded-lg shadow-sm"
            >
              <img
                src={friend.profilePicture || 'https://via.placeholder.com/40'}
                alt={`${friend.name}'s profile`}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div className="flex-1">
                <h4 className="text-lg font-medium">{friend.name}</h4>
                <p className="text-sm text-gray-600">{friend.email}</p>
              </div>
              <p className="text-sm text-gray-500">{friend.mutualGroups} mutual groups</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;

import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';

interface Friend {
  id: number;
  name: string;
  email: string;
  mutualGroups: number;
  profilePicture?: string; // Optional property for profile picture URL
}

const FriendsPage: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newFriend, setNewFriend] = useState<string>('');

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
      { id: 1, name: 'Alice Johnson', email: 'alice@example.com', mutualGroups: 3, profilePicture: 'https://img.icons8.com/?size=100&id=42217&format=png&color=575799' },
      { id: 2, name: 'Bob Smith', email: 'bob@example.com', mutualGroups: 5, profilePicture: 'https://img.icons8.com/?size=100&id=42217&format=png&color=575799' },
      { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', mutualGroups: 2, profilePicture: 'https://img.icons8.com/?size=100&id=42217&format=png&color=575799' },
      { id: 4, name: 'Diana Prince', email: 'diana@example.com', mutualGroups: 4, profilePicture: 'https://img.icons8.com/?size=100&id=42217&format=png&color=575799' },
    ];

    // Simulate API fetch and update state
    setFriends(mockData);
  }, []);

  const handleAddFriend = () => {
    // Simulate adding a friend (you would replace this with an API call)
    if (newFriend.trim()) {
      const newFriendObject: Friend = {
        id: friends.length + 1,
        name: newFriend,
        email: `${newFriend.toLowerCase().replace(/\s+/g, '')}@example.com`,
        mutualGroups: 0,
        profilePicture: 'https://img.icons8.com/?size=100&id=42217&format=png&color=575799',
      };
      setFriends([...friends, newFriendObject]);
      setNewFriend('');
      setIsModalOpen(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Check out all your friends!</h2>
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Your Friends List</h3>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsModalOpen(true)}
          >
            Add Friend
          </Button>
        </div>
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

      {/* Add Friend Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>Add a New Friend</DialogTitle>
        <DialogContent>
          <TextField
            label="Enter Friend's Username or Email"
            fullWidth
            value={newFriend}
            onChange={(e) => setNewFriend(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddFriend} variant="contained" color="primary">
            Add Friend
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FriendsPage;
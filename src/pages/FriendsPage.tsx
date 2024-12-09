import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';

// var Username : "user_name_13";



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
  // const [username, setUsername] = useState<string | undefined>("Sankalp1");
  // const [username] = useState<string | undefined>(localStorage.getItem('username') || undefined);
  const [username] = useState<string>(localStorage.getItem('username') || "");



  useEffect(() => {
    const getFriends = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/users/getFriends?username=${username}`,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
  
        if (!response.ok) {
          throw new Error('Failed to fetch friends');
        }
  
        const result = await response.json();
        
        // Transform the friends data to match your Friend interface
        const friendsList = result.friends.map((friendName: string, index: number) => ({
          id: index + 1,
          name: friendName,
          mutualGroups: 0,
          profilePicture: 'https://img.icons8.com/?size=100&id=42217&format=png&color=575799'
        }));
  
        setFriends(friendsList);
      } catch (error) {
        console.error('Error fetching friends:', error);
        // You might want to show an error message to the user
        alert('Failed to load friends. Please refresh the page.');
      }
    };
  
    if (username) {
      getFriends();
    }
  }, [username]); // Dependency on username
  
  const handleAddFriend = async () => {
    if (newFriend.trim()) {
      try {
        // Make API call to add friend
        const response = await fetch(
          `http://localhost:8080/api/users/addFriend?username=${username}&friendName=${newFriend}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
  
        if (!response.ok) {
          throw new Error('Failed to add friend');
        }
  
        const result = await response.json();
        
        // Create new friend object for UI update
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
  
        // Optionally show success message
        console.log('Friend added successfully:', result);
      } catch (error) {
        console.error('Error adding friend:', error);
        // Optionally show error message to user
        alert('Failed to add friend. Please try again.');
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl">
      <h2 className="text-2xl font-bold mb-4"></h2>
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Your Friends List</h3>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsModalOpen(true)}
            sx={{
              background: 'linear-gradient(to right, #9C27B0, #673AB7)',
              color: '#fff',
              '&:hover': {
                background: 'linear-gradient(to right, #7B1FA2, #5E35B1)',
              },
            }}
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
          <Button onClick={handleAddFriend} variant="contained" color="primary" sx={{
              background: 'linear-gradient(to right, #9C27B0, #673AB7)',
              color: '#fff',
              '&:hover': {
                background: 'linear-gradient(to right, #7B1FA2, #5E35B1)',
              },
            }}>
            Add Friend
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FriendsPage;
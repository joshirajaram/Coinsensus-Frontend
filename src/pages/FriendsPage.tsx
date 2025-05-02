import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import DollarIcon from '../assets/images/dollar.png';
import { Link } from 'react-router-dom';
import NavItem from 'components/NavItem';
import { Activity, Home, Settings, UserPlus } from 'lucide-react';

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
  const [username] = useState<string>(localStorage.getItem('username') || "");

  const baseUrl = process.env.REACT_APP_COINSENSUS_BACKEND_URL || 'http://localhost:8080';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/api/users/getFriends?username=${username}`,
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
        alert('Failed to load friends. Please refresh the page.');
      }
    };

    if (username) {
      getFriends();
    }
  }, [username]);

  const handleAddFriend = async () => {
    if (newFriend.trim()) {
      try {
        const response = await fetch(
          `${baseUrl}/api/users/addFriend?username=${username}&friendName=${newFriend}`,
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

        console.log('Friend added successfully:', result);
      } catch (error) {
        console.error('Error adding friend:', error);
        alert('Failed to add friend. Please try again.');
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <nav
        className={`
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        ${isExpanded ? 'lg:w-64' : 'lg:w-20'}
        fixed lg:relative
        w-64 overflow-y-auto
        bg-white shadow-xl
        transition-all duration-300
        z-50
        p-4
      `}
      >
        <div className="hidden lg:flex items-center mb-12">
        <div className="h-10 w-10 flex items-center justify-center">
        <img
          src={DollarIcon}
          alt="Logo"
          className="h-full w-full object-contain"
        />
      </div>

          {isExpanded && (
            <Link to="/">
            <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              &nbsp; Coinsensus
            </h1>
          </Link>
          )}
        </div>

        <div className="space-y-2 h-screen">
          <NavItem
            icon={<Home size={20} />}
            label="Home"
            path="/home"
            isExpanded={isExpanded}
          />
          {/* //TODO */}
          {/* <NavItem
            icon={<Users size={20} />}
            label="Groups"
            path="/groups"
            isExpanded={isExpanded}
          /> */}
          <NavItem
            icon={<UserPlus size={20} />}
            label="Friends"
            path="/friends"
            isExpanded={isExpanded}
          />
          <NavItem
            icon={<Activity size={20} />}
            label="Activity"
            path="/activity"
            isExpanded={isExpanded}
          />
          <NavItem
            icon={<Settings size={20} />}
            label="Account"
            path="/account"
            isExpanded={isExpanded}
          />
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="hidden lg:block absolute -right-0  top-50 bg-white rounded-full p-2.5 shadow-lg hover:shadow-xl transition-shadow"
        > 
          <div className="h-4 w-4 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full" />
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex-1 lg:ml-54 p-6 bg-white rounded-2xl">
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

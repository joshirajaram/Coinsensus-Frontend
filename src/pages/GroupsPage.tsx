import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Box,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import GroupItem from 'components/GroupItem';

interface Group {
  id: number;
  name: string;
  members: number;
  balance: number;
}

interface Friend {
  id: number;
  name: string;
}

const GroupsPage: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<Friend[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);

  // Simulate fetching groups
  useEffect(() => {
    const mockGroups: Group[] = [
      { id: 5, name: 'Office Lunch', members: 8, balance: -75.3 },
      { id: 6, name: 'Hiking Buddies', members: 7, balance: 200.0 },
      { id: 7, name: 'Game Night', members: 4, balance: 45.5 },
      { id: 8, name: 'College Friends', members: 6, balance: -20.0 },
      { id: 9, name: 'Soccer Team', members: 10, balance: 500.0 },
      { id: 10, name: 'Volunteer Group', members: 12, balance: -10.5 },
    ];
    setGroups(mockGroups);
  }, []);

  // Simulate fetching friends
  useEffect(() => {
    const mockFriends: Friend[] = [
      { id: 1, name: 'Alice Johnson' },
      { id: 2, name: 'Bob Smith' },
      { id: 3, name: 'Charlie Brown' },
      { id: 4, name: 'Diana Prince' },
    ];
    setFriends(mockFriends);
  }, []);

  const handleCreateGroup = () => {
    if (groupName.trim() && selectedMembers.length > 0) {
      const newGroup: Group = {
        id: groups.length + 1,
        name: groupName,
        members: selectedMembers.length,
        balance: 0, // Initial balance set to 0
      };

      setGroups([...groups, newGroup]);
      setGroupName('');
      setSelectedMembers([]);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">
        Check out your current active groups below!
      </h2>
      {/* Groups Overview */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Active Groups</h3>
          <Button
            variant="contained"
            onClick={() => setIsModalOpen(true)}
            sx={{
              background: 'linear-gradient(to right, #9C27B0, #673AB7)',
              color: '#fff',
              '&:hover': {
                background: 'linear-gradient(to right, #7B1FA2, #5E35B1)',
              },
            }}
          >
            New Group
          </Button>
        </div>
        <div className="space-y-4">
          {groups.map((group) => (
            <GroupItem
              key={group.id}
              name={group.name}
              members={group.members}
              balance={group.balance}
            />
          ))}
        </div>
      </div>

      {/* New Group Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>Create New Group</DialogTitle>
        <DialogContent>
          <TextField
            label="Group Name"
            fullWidth
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            margin="normal"
          />
          <Box sx={{ marginTop: 2 }}>
            <label>Select Members:</label>
            <Autocomplete
              multiple
              options={friends}
              getOptionLabel={(friend) => friend.name}
              value={selectedMembers}
              onChange={(_, newValue) => setSelectedMembers(newValue)}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" placeholder="Search friends" />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option.name}
                    {...getTagProps({ index })} // Already includes the key property
                  />
                ))
              }              
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsModalOpen(false)}
            sx={{
              background: 'linear-gradient(to right, #9C27B0, #673AB7)',
              color: '#fff',
              '&:hover': {
                background: 'linear-gradient(to right, #7B1FA2, #5E35B1)',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateGroup}
            variant="contained"
            sx={{
              background: 'linear-gradient(to right, #9C27B0, #673AB7)',
              color: '#fff',
              '&:hover': {
                background: 'linear-gradient(to right, #7B1FA2, #5E35B1)',
              },
            }}
            disabled={!groupName.trim() || selectedMembers.length === 0}
          >
            Create Group
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GroupsPage;
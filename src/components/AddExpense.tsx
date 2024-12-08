import React, { useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  MenuItem,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  SelectChangeEvent
} from '@mui/material';
import { Plus } from 'lucide-react';

// Define the types for the contributions and users
interface Contribution {
  user: string;
  amount: string;
}

interface AddExpenseProps {
  onClose: () => void;
}

const AddExpense: React.FC<AddExpenseProps> = ({ onClose }) => {
  const [expenseType, setExpenseType] = useState<string>('individual');
  const [splitMethod, setSplitMethod] = useState<string>('equal');
  const [customContributions, setCustomContributions] = useState<Contribution[]>([]);
  const [showCustomSplitDialog, setShowCustomSplitDialog] = useState<boolean>(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | ''>('');
  const [amountError, setAmountError] = useState<string>('');

  // Mock users and groups
  const allUsers = ['Alice', 'Bob', 'Charlie', 'David'];
  const groups = [
    { id: 'group1', name: 'Office Friends', members: ['Alice', 'Bob', 'Charlie'] },
    { id: 'group2', name: 'Hiking Buddies', members: ['David', 'Alice'] },
  ];

  const handleExpenseTypeChange = (event: React.MouseEvent<HTMLElement>, newType: string | null) => {
    if (newType) {
      setExpenseType(newType);
      if (newType === 'group') {
        setSelectedGroup(null);
        setSelectedUsers([]);
      }
    }
  };

  const handleGroupChange = (event: SelectChangeEvent<string>) => {
    const groupId = event.target.value; // Extract the value directly
    const group = groups.find((g) => g.id === groupId);
    setSelectedGroup(groupId);
    setSelectedUsers(group ? group.members : []);
  };
  

  const handleSplitMethodChange = (event: React.MouseEvent<HTMLElement>, newMethod: string | null) => {
    if (newMethod) {
      setSplitMethod(newMethod);
      if (newMethod === 'custom') {
        initializeCustomContributions();
        setShowCustomSplitDialog(true);
      }
    }
  };

  const initializeCustomContributions = () => {
    const contributions = selectedUsers.map((user) => ({
      user,
      amount: '',
    }));
    setCustomContributions(contributions);
  };

  const handleCustomAmountChange = (index: number, value: string) => {
    const updatedContributions = [...customContributions];
    updatedContributions[index].amount = value;
    setCustomContributions(updatedContributions);
  };

  const validateCustomSplit = () => {
    const totalAmount = customContributions.reduce((sum, contribution) => {
      return sum + (parseFloat(contribution.amount) || 0);
    }, 0);

    if (totalAmount !== parseFloat(String(amount))) {
      setAmountError('The total split does not equal the entered amount.');
      return false;
    }

    setAmountError('');
    return true;
  };

  const handleAddExpense = () => {
    if (splitMethod === 'custom' && !validateCustomSplit()) {
      return;
    }
    // Placeholder for API call to add expense
    console.log({
      expenseType,
      splitMethod,
      selectedGroup,
      selectedUsers,
      customContributions,
      amount,
    });
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <div className="flex justify-between">
          <Typography variant="h6">Add New Expense</Typography>
          <Button onClick={onClose} color="secondary">
            Close
          </Button>
        </div>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
            padding: 4,
            maxWidth: '800px',
            margin: 'auto',
            backgroundColor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h5">Add Expense</Typography>

          {/* Group Selection */}
          {expenseType === 'group' && (
            <Box sx={{ width: '100%' }}>
              <Typography>Choose a Group:</Typography>
              <Select
                value={selectedGroup || ''}
                onChange={handleGroupChange}
                displayEmpty
                fullWidth
              >
                <MenuItem value="" disabled>
                  Select Group
                </MenuItem>
                {groups.map((group) => (
                  <MenuItem key={group.id} value={group.id}>
                    {group.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          )}

          {/* User Selection */}
          <Box sx={{ width: '100%' }}>
            <Typography>With you and:</Typography>
            <Select
              multiple
              value={selectedUsers}
              onChange={(event) => setSelectedUsers(event.target.value as string[])}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              fullWidth
            >
              {allUsers.map((user) => (
                <MenuItem key={user} value={user}>
                  {user}
                </MenuItem>
              ))}
            </Select>
          </Box>

          {/* Description and Amount */}
          <TextField label="Enter a Description" fullWidth />
          <TextField
            label="Enter Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value ? parseFloat(e.target.value) : '')}
            fullWidth
          />

          {/* Expense Type */}
          <Typography>Expense Type</Typography>
          <ToggleButtonGroup
            value={expenseType}
            exclusive
            onChange={handleExpenseTypeChange}
            sx={{ width: '100%' }}
          >
            <ToggleButton value="individual">Individual</ToggleButton>
            <ToggleButton value="group">Group</ToggleButton>
          </ToggleButtonGroup>

          {/* Split Method */}
          <Typography>Split Method</Typography>
          <ToggleButtonGroup
            value={splitMethod}
            exclusive
            onChange={handleSplitMethodChange}
            sx={{ width: '100%' }}
          >
            <ToggleButton value="equal">Equally</ToggleButton>
            <ToggleButton value="custom">Custom</ToggleButton>
          </ToggleButtonGroup>

          {/* Add Expense Button */}
          <Button
            variant="contained"
            fullWidth
            onClick={handleAddExpense}
            sx={{
              backgroundColor: '#9C27B0', // Purple
              '&:hover': {
                backgroundColor: '#7B1FA2', // Darker purple on hover
              },
            }}
          >
            <Plus /> Add Expense
          </Button>
        </Box>
      </DialogContent>

      {/* Custom Split Dialog */}
      <Dialog open={showCustomSplitDialog} onClose={() => setShowCustomSplitDialog(false)}>
        <DialogTitle>Custom Split</DialogTitle>
        <DialogContent>
          <Typography>Enter amounts for each user:</Typography>
          {customContributions.map((contribution, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <Typography>{contribution.user}</Typography>
              <TextField
                type="number"
                value={contribution.amount}
                onChange={(e) => handleCustomAmountChange(index, e.target.value)}
                fullWidth
              />
            </Box>
          ))}
          {amountError && <Typography color="error">{amountError}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowCustomSplitDialog(false)}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (validateCustomSplit()) {
                setShowCustomSplitDialog(false);
              }
            }}
            variant="contained"
            color="primary"
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
};

export default AddExpense;

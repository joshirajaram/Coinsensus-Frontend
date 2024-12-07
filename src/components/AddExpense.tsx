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

  // Mock users (replace with API call to fetch users later)
  const allUsers = ['Alice', 'Bob', 'Charlie', 'David'];

  const handleExpenseTypeChange = (event: React.MouseEvent<HTMLElement>, newType: string | null) => {
    if (newType) setExpenseType(newType);
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

  const handleAddExpense = () => {
    // Placeholder for API call to add expense
    console.log({
      expenseType,
      splitMethod,
      selectedUsers,
      customContributions,
    });
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
            maxWidth: '800px',  // Increase the maximum width
            margin: 'auto',
            backgroundColor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h5">Add Expense</Typography>

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
          <TextField label="Enter Amount" type="number" fullWidth />

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
    </Dialog>
  );
};

export default AddExpense;

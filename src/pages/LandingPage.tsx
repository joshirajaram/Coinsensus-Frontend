import React, { useEffect, useState } from 'react';
import {
  Home,
  Users,
  UserPlus,
  Activity,
  Settings,
  Plus,
  TrendingUp,
  Menu,
  X,
  CreditCard,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import NavItem from '../components/NavItem';
import AddExpense from '../components/AddExpense'; // Import the AddExpense component
import { Outlet, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import DollarIcon from '../assets/images/dollar.png';
import { useNavigate } from 'react-router-dom';
import StatCard from 'components/StatCard';
import './HomePage.css';
import ActivityItem from 'components/ActivityItem';

interface Activity {
  id: number;
  title: string;
  amount: number;
  group: string;
  time: string;
  description: string;
  users: string; // Changed to string to match ActivityItem props
}

interface LandingPageProps {
  handleSignOut: () => void;
  // handleSignIn: () => void;
}

interface BalanceResponse {
  balances: {
    [key: string]: number;
  }
}


const LandingPage: React.FC<LandingPageProps> = ({ handleSignOut }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState<boolean>(false);
  const [isSettleTransactionsOpen, setIsSettleTransactionsOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<{ name: string; amount: number } | null>(null);
  const [balances, setBalances] = useState<Array<{ name: string; amount: number }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRefreshBalances, setShouldRefreshBalances] = useState(false);
  const [totalBalance, setTotalBalance] = useState(0);
  const [activities, setActivities] = useState<Activity[]>([]);

  const handleSignIn = () => {
    navigate('/add-expense');
  };

  const baseUrl = process.env.REACT_APP_COINSENSUS_BACKEND_URL || 'http://localhost:8080';

  const location = useLocation();

  // Filter non-zero balances
  const nonZeroBalances = balances.filter((balance) => balance.amount !== 0);

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/home':
        return 'Dashboard';
      case '/groups':
        return 'Groups';
      case '/friends':
        return 'Friends';
      case '/activity':
        return 'Activity';
      case '/account':
        return 'Account';
      default:
        return 'Dashboard';
    }
  };

  const openAddExpenseModal = () => setIsAddExpenseOpen(true);

  const closeSettleTransactionsModal = () => setIsSettleTransactionsOpen(false);
  const openSettleTransactionsModal = () => setIsSettleTransactionsOpen(true);

  const confirmSettlement = async () => {
    if (selectedUser) {
      try {
        const username = localStorage.getItem('username');
        const amount = Math.abs(selectedUser.amount); // Use absolute value for the API

        // Determine who pays whom based on amount sign
        const transactionData = {
          method: "add_expense",
          paid_by: selectedUser.amount > 0 ? selectedUser.name : username, // If amount is positive, they owe us
          owed_by: [selectedUser.amount > 0 ? username : selectedUser.name], // If amount is positive, we are owed
          owed_amounts: [amount],
          amount: amount,
          description: "settled up"
        };

        console.log("Settlement transaction data:", transactionData); // Debug log

        const response = await fetch(`${baseUrl}/api/transactions/createTransaction`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(transactionData)
        });

        if (!response.ok) {
          throw new Error('Failed to create settlement transaction');
        }

        // If successful, update the UI
        setBalances((prevBalances) =>
          prevBalances.filter((balance) => balance.name !== selectedUser.name)
        );
        setSelectedUser(null); // Close the confirmation dialog
        setShouldRefreshBalances(true); // Refresh balances after settlement
        setIsSettleTransactionsOpen(false); // Close the settle transactions modal

        // Dispatch event to update balances
        window.dispatchEvent(new Event('settlementConfirm'));
        // Optional: Show success message
        // alert('Settlement transaction completed successfully!');

      } catch (error) {
        console.error('Error creating settlement transaction:', error);
        alert('Failed to create settlement transaction. Please try again.');
      }
    }
  };

  const fetchBalances = async () => {
    const username = localStorage.getItem('username');
    console.log("Username", username);
    if (!username) return;

    try {
      setIsLoading(true);
      const response = await fetch(
        `${baseUrl}/api/transactions/getBalances?username=${username}`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) throw new Error('Failed to fetch balances');

      const data: BalanceResponse = await response.json();
      const balanceArray = Object.entries(data.balances).map(([name, amount]) => ({
        name,
        amount,
      }));
      setBalances(balanceArray);

      // Calculate total balance
      const total = Object.values(data.balances).reduce((sum, amt) => sum + amt, 0);
      console.log("The value of balance is : ", total);
      setTotalBalance(total);

    } catch (err) {
      console.error('Error fetching balances:', err);
    } finally {
      setIsLoading(false);
    }
  };


  // Initial fetch on mount
  useEffect(() => {
    fetchBalances();
  }, []); // Empty dependency array for initial load

  useEffect(() => {
    const handleExpenseAdded = () => fetchBalances();
    window.addEventListener('expenseAdded', handleExpenseAdded);
    window.addEventListener('settlementConfirm', handleExpenseAdded);
    return () => {
      window.removeEventListener('expenseAdded', handleExpenseAdded);
      window.removeEventListener('settlementConfirm', handleExpenseAdded);
    };
  }, []);

  const handleGetStartedClick = () => {
    navigate('/add-expense');
  }

  // Refresh balances when shouldRefreshBalances changes
  useEffect(() => {
    if (shouldRefreshBalances) {
      fetchBalances();
    }
  }, [shouldRefreshBalances]);
  useEffect(() => {
    console.log("totalBalance : ", totalBalance); // Log to check if totalBalance is being set correctly
  }, [totalBalance]);

  // Modify closeAddExpenseModal to trigger balance refresh
  const closeAddExpenseModal = () => {
    setIsAddExpenseOpen(false);
    setShouldRefreshBalances(true); // This will trigger the balance refresh
  };


  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 flex items-center justify-center">
            <img
              src={DollarIcon} // Replace with the actual path to your favicon
              alt="Logo"
              className="h-full w-full object-contain"
            />
          </div>

          <Link to="/">
            <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              &nbsp; Coinsensus
            </h1>
          </Link>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Responsive Navigation */}
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
          className="hidden lg:block absolute -right-0  top-1/3 bg-white rounded-full p-2.5 shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="h-4 w-4 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full" />
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 pt-4 overflow-y-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 space-y-4 md:space-y-0">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">{getPageTitle()}</h2>
            {/* <p className="text-gray-500 mt-1">Welcome back!</p> */}
            <p className="text-gray-500 mt-1">
              Welcome back{localStorage.getItem('username') ? `, ${localStorage.getItem('username')}!` : '!'}
            </p>

          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={openSettleTransactionsModal}
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <TrendingUp className="h-5 w-5" />
              <span>Settle Transactions</span>
            </button>
            <button
              onClick={openAddExpenseModal}
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <Plus className="h-5 w-5" />
              <span>Add Expense</span>
            </button>
            {/* <button
              onClick={handleSignIn}
              className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-100 rounded-lg border border-gray-300 transition-colors duration-200 ml-2"
            >
              <LogOut size={18} />
              <span>Login</span>
            </button> */}
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-100 rounded-lg border border-gray-300 transition-colors duration-200 ml-2"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {!isLoading && (
            <>
              {totalBalance > 0 ? (
                <StatCard
                  icon={<TrendingUp size={20} />}
                  title="You are owed"
                  amount={`$${Math.abs(totalBalance).toFixed(2)}`}
                  trend="up"
                  trendValue="12.5%"
                />
              ) : totalBalance < 0 ? (
                <StatCard
                  icon={<CreditCard size={20} />}
                  title="You owe"
                  amount={`$${Math.abs(totalBalance).toFixed(2)}`}
                  trend="down"
                  trendValue="5.2%"
                />
              ) : (
                <StatCard
                  icon={<TrendingUp size={20} />}
                  title="Balance"
                  amount="You're all settled up!"
                  trend="neutral"
                  trendValue="0%"
                />
              )}
            </>
          )}
        </div>
        <div className="flex-1 p-6 lg:ml-49 mt-16 lg:mt-0"> {/* Added margin-top for fixed navbar */}
          <h2 className="text-2xl font-bold mb-4">Check out your recent activity below!</h2>
          <div className="grid grid-cols-1 gap-4 lg:gap-6">
            <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-6">Recent Activity</h3>
              {activities.length > 0 ? (
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <ActivityItem
                      key={activity.id}
                      title={activity.title}
                      amount={activity.amount}
                      group={activity.group}
                      time={activity.time}
                      description={activity.description}
                      users={activity.users} // Now passing string instead of number
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">No recent activities</p>
              )}
            </div>
          </div>
        </div>
        <Outlet />
      </main>

      {/* Add Expense Modal */}
      {isAddExpenseOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-xl p-8 w-96">
            <AddExpense onClose={closeAddExpenseModal} />
          </div>
        </div>
      )}

      {/* Settle Transactions Modal */}
      {isSettleTransactionsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-xl p-8 w-96">
            <h3 className="text-xl font-bold mb-4">Settle Transactions</h3>
            {nonZeroBalances.length > 0 ? (
              <ul className="space-y-4">
                {nonZeroBalances.map((balance) => (
                  <li
                    key={balance.name}
                    className={`flex justify-between p-2 rounded-lg cursor-pointer ${balance.amount > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    onClick={() => setSelectedUser(balance)}
                  >
                    <span>{balance.name}</span>
                    <span>{balance.amount > 0 ? `+${balance.amount}` : balance.amount}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">Nothing to settle</p>
            )}
            <button
              onClick={closeSettleTransactionsModal}
              className="mt-4 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Confirm Settlement Dialog */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-xl p-6 w-96">
            <p className="text-gray-800 text-center">
              Are you sure you want to settle the balance with <strong>{selectedUser.name}</strong>?
            </p>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmSettlement}
                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
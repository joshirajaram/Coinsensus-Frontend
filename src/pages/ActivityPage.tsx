import ActivityItem from 'components/ActivityItem';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DollarIcon from '../assets/images/dollar.png';
import NavItem from 'components/NavItem';
import { Activity, Home, Settings, UserPlus } from 'lucide-react';

// Interface for API Response
interface TransactionResponse {
  transactions: {
    sender: string;
    receiver: string;
    amount: number;
    timestamp: string;
    description: string;
  }[];
}

// Interface for Activity after transformation - match ActivityItem props
interface Activity {
  id: number;
  title: string;
  amount: number;
  group: string;
  time: string;
  description: string;
  users: string; // Changed to string to match ActivityItem props
}

const ActivityPage: React.FC = () => {
  const [username] = useState<string>(localStorage.getItem('username') || "");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const baseUrl = process.env.REACT_APP_COINSENSUS_BACKEND_URL || 'http://localhost:8080';

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/api/transactions/getTransactionHistory?username=${username}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch activities');
        }

        const data = await response.json();
        console.log('API Response:', data);

        if (!data.transactions || !Array.isArray(data.transactions)) {
          console.error('Invalid response format:', data);
          return;
        }

        const transformedData: Activity[] = data.transactions.map(
          (transaction: any, index: number) => ({
            id: index + 1,
            title: `${transaction.sender} paid ${transaction.receiver}`,
            amount: transaction.amount,
            group: 'Personal',
            time: new Date(parseFloat(transaction.timestamp) * 1000).toLocaleString(),
            description: transaction.description || '',
            users: `${transaction.sender}, ${transaction.receiver}`, // Pass as string
          })
        );

        setActivities(transformedData);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    if (username) {
      fetchActivities();
    }
  }, [username]);

  return (
    <div className="flex">
      {/* Sidebar/Navbar */}
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
            path="/"
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

      {/* Main Content Area */}
      <div className="flex-1 p-6 lg:ml-64 mt-16 lg:mt-0"> {/* Added margin-top for fixed navbar */}
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
    </div>
  );
};

export default ActivityPage;

import ActivityItem from 'components/ActivityItem';
import React, { useState, useEffect } from 'react';

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
  users: string;  // Changed to string to match ActivityItem props
}

const ActivityPage: React.FC = () => {
  const [username] = useState<string>(localStorage.getItem('username') || "");
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/transactions/getTransactionHistory?username=${username}`
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
            users: `${transaction.sender}, ${transaction.receiver}`  // Pass as string
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
    <div className="p-6 bg-white rounded-2xl">
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
                  users={activity.users}  // Now passing string instead of number
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No recent activities</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;
import ActivityItem from 'components/ActivityItem';
import React, { useState, useEffect } from 'react';

interface Activity {
  id: number;
  title: string;
  amount: number;
  group: string; // Could be used for category or empty string in this case
  time: string;
  description: string;
  users: string; // String representation of users involved
}

const ActivityPage: React.FC = () => {
  const [username] = useState<string>(localStorage.getItem('username') || ""); // Move useState inside the component
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/transactions/getTransactionHistory?username=${username}`
        );
        const data = await response.json();

        const transformedData: Activity[] = data.transactions.map(
          (transaction: any, index: number) => ({
            id: index + 1, // Create a unique ID
            title: `${transaction.sender} paid ${transaction.receiver}`,
            amount: transaction.amount,
            group: '', // Optional; add grouping if necessary
            time: new Date(parseFloat(transaction.timestamp) * 1000).toLocaleString(), // Convert timestamp to readable time
            description: transaction.description,
            users: `${transaction.sender}, ${transaction.receiver}`, // List users involved
          })
        );

        setActivities(transformedData);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, [username]); // Add username as a dependency

  return (
    <div className="p-6 bg-white rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Check out your recent activity below!</h2>
      {/* Activity and Groups Grid */}
      <div className="grid grid-cols-1 gap-4 lg:gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {activities.map((activity) => (
              <ActivityItem
                key={activity.id}
                title={activity.title}
                amount={activity.amount}
                group={activity.group}
                time={activity.time}
                description={activity.description} // Pass description to ActivityItem
                users={activity.users}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;
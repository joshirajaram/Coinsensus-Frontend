import ActivityItem from 'components/ActivityItem';
import React, { useState, useEffect } from 'react';

interface Activity {
  id: number;
  title: string;
  amount: number;
  group: string;
  time: string;
  users: number;
}

const ActivityPage: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  // use this for api integration
  // useEffect(() => {
  //   fetch('/api/activities') // Replace with your endpoint
  //     .then(response => response.json())
  //     .then(data => setActivities(data))
  //     .catch(error => console.error('Error fetching activities:', error));
  // }, []);
  

  useEffect(() => {
    // Mock data to simulate an API response
    const mockData: Activity[] = [
      { id: 4, title: 'Electric Bill', amount: 120.0, group: 'Roommates', time: '3d ago', users: 4 },
      { id: 5, title: 'Movie Tickets', amount: 50.0, group: 'Friends', time: '4d ago', users: 3 },
      { id: 6, title: 'Concert Tickets', amount: 200.0, group: 'Coworkers', time: '1w ago', users: 6 },
      { id: 1, title: 'Grocery Shopping', amount: 85.2, group: 'Roommates', time: '2h ago', users: 4 },
      { id: 2, title: 'Netflix', amount: 15.99, group: 'Family', time: '5h ago', users: 3 },
      { id: 3, title: 'Dinner', amount: 125.5, group: 'Friends', time: '1d ago', users: 5 },
    ];
    

    // Simulate API fetch and update state
    setActivities(mockData);
  }, []);

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

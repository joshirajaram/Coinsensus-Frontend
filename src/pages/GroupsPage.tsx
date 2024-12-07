import GroupItem from 'components/GroupItem';
import React, { useState, useEffect } from 'react';

interface Group {
  id: number;
  name: string;
  members: number;
  balance: number;
}

const GroupsPage: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);

  // update this later after api integration
  // useEffect(() => {
  //   fetch('/api/groups') // Replace with your endpoint
  //     .then((response) => response.json())
  //     .then((data) => setGroups(data))
  //     .catch((error) => console.error('Error fetching groups:', error));
  // }, []);
  

  useEffect(() => {
    // Mock data to simulate an API response
    const mockData: Group[] = [
      { id: 5, name: 'Office Lunch', members: 8, balance: -75.3 },
      { id: 6, name: 'Hiking Buddies', members: 7, balance: 200.0 },
      { id: 7, name: 'Game Night', members: 4, balance: 45.5 },
      { id: 8, name: 'College Friends', members: 6, balance: -20.0 },
      { id: 9, name: 'Soccer Team', members: 10, balance: 500.0 },
      { id: 10, name: 'Volunteer Group', members: 12, balance: -10.5 },
    ];

    // Simulate API fetch and update state
    setGroups(mockData);
  }, []);

  return (
    <div className="p-6 bg-white rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Check out your current active groups below!</h2>
      {/* Groups Overview */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-6">Active Groups</h3>
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
    </div>
  );
};

export default GroupsPage;
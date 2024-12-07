import React from 'react';
import StatCard from '../components/StatCard';
import ActivityItem from '../components/ActivityItem';
import GroupItem from '../components/GroupItem';
import { TrendingUp, Users, CreditCard } from 'lucide-react';

const HomePage: React.FC = () => (
  <>
    {/* Quick Stats */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
      <StatCard 
        icon={<TrendingUp size={20} />}
        title="You are owed" 
        amount="$1,240.50" 
        trend="up"
        trendValue="12.5%"
      />
      <StatCard 
        icon={<CreditCard size={20} />}
        title="You owe" 
        amount="$380.20" 
        trend="down"
        trendValue="5.2%"
      />
      <StatCard 
        icon={<Users size={20} />}
        title="Active Groups" 
        amount="8" 
        trend="up"
        trendValue="2"
      />
    </div>

    {/* Activity and Groups Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      {/* Recent Activity */}
      <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-6">Recent Activity</h3>
        <div className="space-y-4">
          <ActivityItem 
            title="Grocery Shopping"
            amount={85.20}
            group="Roommates"
            time="2h ago"
            users={4}
          />
          <ActivityItem 
            title="Netflix"
            amount={15.99}
            group="Family"
            time="5h ago"
            users={3}
          />
          <ActivityItem 
            title="Dinner"
            amount={125.50}
            group="Friends"
            time="1d ago"
            users={5}
          />
        </div>
      </div>

      {/* Groups Overview */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-6">Active Groups</h3>
        <div className="space-y-4">
          <GroupItem name="Roommates" members={4} balance={320.50} />
          <GroupItem name="Trip to Vegas" members={6} balance={-45.20} />
          <GroupItem name="Family" members={3} balance={0} />
        </div>
      </div>
    </div>
  </>
);

export default HomePage;
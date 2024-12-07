import React from 'react';
import { ActivityItemProps } from '../types';

const ActivityItem: React.FC<ActivityItemProps> = ({ title, amount, group, time, users }) => (
  <div className="flex items-center justify-between py-3 group cursor-pointer">
    <div className="flex items-center space-x-4">
      <div className="h-10 w-10 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-white font-medium group-hover:scale-110 transition-transform">
        {title[0]}
      </div>
      <div>
        <h4 className="font-medium text-gray-800">{title}</h4>
        <p className="text-sm text-gray-500">{group} • {time}</p>
      </div>
    </div>
    <div className="text-right">
      <span className="font-semibold text-gray-800">${amount}</span>
      <p className="text-sm text-gray-500">{users} members</p>
    </div>
  </div>
);

export default ActivityItem;
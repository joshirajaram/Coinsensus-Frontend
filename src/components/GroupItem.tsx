import React from 'react';
import { GroupItemProps } from '../types';

const GroupItem: React.FC<GroupItemProps> = ({ name, members, balance }) => (
  <div className="flex items-center justify-between py-3 cursor-pointer group">
    <div className="flex items-center space-x-3">
      <div className="h-10 w-10 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center text-white font-medium group-hover:scale-110 transition-transform">
        {name[0]}
      </div>
      <div>
        <h4 className="font-medium text-gray-800">{name}</h4>
        <p className="text-sm text-gray-500">{members} members</p>
      </div>
    </div>
    <span className={`font-semibold ${
      balance > 0 ? 'text-emerald-600' : balance < 0 ? 'text-red-500' : 'text-gray-600'
    }`}>
      {balance > 0 ? '+' : ''}{balance !== 0 ? `$${Math.abs(balance)}` : 'Settled up'}
    </span>
  </div>
);

export default GroupItem;
import React from 'react';
import { StatCardProps } from '../types';

const StatCard: React.FC<StatCardProps> = ({ icon, title, amount, trend, trendValue }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all group">
    <div className="flex items-center space-x-3 mb-4">
      <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-gray-600">{title}</h3>
    </div>
    <p className="text-3xl font-bold text-gray-800 mb-2">{amount}</p>
    <div className={`text-sm flex items-center ${
      trend === 'up' ? 'text-emerald-600' : 'text-red-500'
    }`}>
      {trend === 'up' ? '↑' : '↓'} {trendValue}
      <span className="text-gray-400 ml-1">from last month</span>
    </div>
  </div>
);

export default StatCard;
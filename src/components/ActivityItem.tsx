import React from 'react';
import { ActivityItemProps } from '../types';

const ActivityItem: React.FC<ActivityItemProps> = ({
  title,
  amount,
  group,
  time,
  description,
  users,
}) => (
  <div className="flex items-center justify-between py-3 group cursor-pointer">
    <div>
      <h4 className="text-lg font-bold">{title}</h4>
      <p className="text-sm text-gray-500">{time}</p>
      <p className="text-sm text-gray-700">{description}</p>
      <p className="text-sm text-gray-600">
        Amount: ${amount.toFixed(2)} | Involved: {users}
      </p>
    </div>
  </div>
);

export default ActivityItem;
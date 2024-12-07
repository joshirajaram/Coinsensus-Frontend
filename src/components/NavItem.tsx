import React from 'react';
import { NavItemProps } from '../types';

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, isExpanded }) => (
  <div className={`flex items-center px-3 py-3 rounded-xl cursor-pointer transition-all group ${
    active 
      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white' 
      : 'text-gray-600 hover:bg-gray-50'
  }`}>
    <div className={`${!isExpanded ? 'mx-auto' : ''}`}>{icon}</div>
    {isExpanded && <span className="font-medium ml-3">{label}</span>}
  </div>
);

export default NavItem;
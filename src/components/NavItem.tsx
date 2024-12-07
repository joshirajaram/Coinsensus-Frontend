// src/components/NavItem.tsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;  // Add this to specify where to navigate
  isExpanded: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, path, isExpanded }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <div 
      onClick={() => navigate(path)}
      className={`flex items-center px-3 py-3 rounded-xl cursor-pointer transition-all group ${
        isActive 
          ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white' 
          : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      <div className={`${!isExpanded ? 'mx-auto' : ''}`}>{icon}</div>
      {isExpanded && <span className="font-medium ml-3">{label}</span>}
    </div>
  );
};

export default NavItem;
import React, { useState } from 'react';
import { Home, Users, UserPlus, Activity, Settings, Plus, Bell, Search, TrendingUp, CreditCard, Menu, X } from 'lucide-react';
import NavItem from '../components/NavItem';
import StatCard from '../components/StatCard';
import ActivityItem from '../components/ActivityItem';
import GroupItem from '../components/GroupItem';
import AddExpense from '../components/AddExpense'; // Import the AddExpense component
import { Outlet, useLocation } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState<boolean>(false);
  const location = useLocation();

  // Get page title based on current route
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard';
      case '/groups': return 'Groups';
      case '/friends': return 'Friends';
      case '/activity': return 'Activity';
      case '/account': return 'Account';
      default: return 'Dashboard';
    }
  };
  const closeAddExpenseModal = () => setIsAddExpenseOpen(false);
  const openAddExpenseModal = () => setIsAddExpenseOpen(true);

  const [userName, setUserName] = useState<string | undefined>();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
            <span className="text-lg font-bold text-white">S</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Coinsensus
          </h1>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Responsive Navigation */}
      <nav className={`
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        ${isExpanded ? 'lg:w-64' : 'lg:w-20'}
        fixed lg:relative
        w-64 h-full
        bg-white shadow-xl
        transition-all duration-300
        z-50
        p-4
      `}>
        <div className="hidden lg:flex items-center mb-12">
          <div className="h-10 w-10 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
            <span className="text-xl font-bold text-white">S</span>
          </div>
          {isExpanded && <h1 className="text-2xl font-bold ml-3 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Coinsensus</h1>}
        </div>
        
        <div className="space-y-2 h-screen">
          <NavItem 
            icon={<Home size={20} />} 
            label="Home" 
            path="/" 
            isExpanded={isExpanded} 
          />
          <NavItem 
            icon={<Users size={20} />} 
            label="Groups" 
            path="/groups" 
            isExpanded={isExpanded} 
          />
          <NavItem 
            icon={<UserPlus size={20} />} 
            label="Friends" 
            path="/friends" 
            isExpanded={isExpanded} 
          />
          <NavItem 
            icon={<Activity size={20} />} 
            label="Activity" 
            path="/activity" 
            isExpanded={isExpanded} 
          />
          <NavItem 
            icon={<Settings size={20} />} 
            label="Account" 
            path="/account" 
            isExpanded={isExpanded} 
          />
        </div>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="hidden lg:block absolute -right-3 top-1/2 bg-white rounded-full p-1.5 shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="h-4 w-4 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full" />
        </button>
      </nav>

      <main className="flex-1 p-4 lg:p-8 pt-4 overflow-y-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 space-y-4 md:space-y-0">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">{getPageTitle()}</h2>
            <p className="text-gray-500 mt-1">Welcome back!</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <Search className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <Bell className="h-5 w-5 text-gray-600" />
            </button>
            <button 
              onClick={() => setIsAddExpenseOpen(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <Plus className="h-5 w-5" />
              <span>Add Expense</span>
            </button>
          </div>
        </div>
        <Outlet />
      </main>


       {/* Add Expense Modal */}
       {isAddExpenseOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-xl p-8 w-96">
            <AddExpense onClose={closeAddExpenseModal} />
          </div>
        </div>
      )}
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}


    </div>
  );
};

export default LandingPage;
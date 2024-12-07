import React, { useState } from 'react';
import { Home, Users, UserPlus, Activity, Settings, Plus, Bell, Search, TrendingUp, CreditCard, Menu, X } from 'lucide-react';
import NavItem from './NavItem';
import StatCard from './StatCard';
import ActivityItem from './ActivityItem';
import GroupItem from './GroupItem';

const LandingPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
        {/* Desktop Logo - Hidden on Mobile */}
        <div className="hidden lg:flex items-center mb-12">
          <div className="h-10 w-10 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
            <span className="text-xl font-bold text-white">S</span>
          </div>
          {isExpanded && <h1 className="text-2xl font-bold ml-3 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Splitwise</h1>}
        </div>
        
        <div className="space-y-2">
          <NavItem icon={<Home size={20} />} label="Home" active isExpanded={isExpanded} />
          <NavItem icon={<Users size={20} />} label="Groups" isExpanded={isExpanded} />
          <NavItem icon={<UserPlus size={20} />} label="Friends" isExpanded={isExpanded} />
          <NavItem icon={<Activity size={20} />} label="Activity" isExpanded={isExpanded} />
          <NavItem icon={<Settings size={20} />} label="Account" isExpanded={isExpanded} />
        </div>

        {/* Desktop Toggle - Hidden on Mobile */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="hidden lg:block absolute -right-3 top-1/2 bg-white rounded-full p-1.5 shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="h-4 w-4 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full" />
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 pt-4 overflow-y-auto">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 space-y-4 md:space-y-0">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">Dashboard</h2>
            <p className="text-gray-500 mt-1">Welcome back, {userName}!</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <Search className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <Bell className="h-5 w-5 text-gray-600" />
            </button>
            <button className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <Plus className="h-5 w-5" />
              <span>Add Expense</span>
            </button>
          </div>
        </div>

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
      </main>

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
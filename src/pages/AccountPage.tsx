import React, { useState } from 'react';
import DollarIcon from '../assets/images/dollar.png';
import { Link } from 'react-router-dom';
import NavItem from 'components/NavItem';
import { Activity, Home, Settings, UserPlus } from 'lucide-react';

const AccountPage: React.FC = () => {
  const [profilePic, setProfilePic] = useState<string>('https://img.icons8.com/?size=100&id=42217&fiormat=png&color=575799');
  const [name, setName] = useState<string>(localStorage.getItem('username') || "");
  const [email, setEmail] = useState<string>(localStorage.getItem('username') + '@gmail.com');
  const [currency, setCurrency] = useState<string>('USD');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setProfilePic(reader.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar/Navbar */}
      <nav
        className={`
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        ${isExpanded ? 'lg:w-64' : 'lg:w-20'}
        fixed lg:relative
        w-64 overflow-y-auto
        bg-white shadow-xl
        transition-all duration-300
        z-50
        p-4
      `}
      >
        <div className="hidden lg:flex items-center mb-12">
        <div className="h-10 w-10 flex items-center justify-center">
        <img
          src={DollarIcon}
          alt="Logo"
          className="h-full w-full object-contain"
        />
      </div>

          {isExpanded && (
            <Link to="/">
            <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              &nbsp; Coinsensus
            </h1>
          </Link>
          )}
        </div>

        <div className="space-y-2 h-screen">
          <NavItem
            icon={<Home size={20} />}
            label="Home"
            path="/"
            isExpanded={isExpanded}
          />
          {/* //TODO */}
          {/* <NavItem
            icon={<Users size={20} />}
            label="Groups"
            path="/groups"
            isExpanded={isExpanded}
          /> */}
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
          className="hidden lg:block absolute -right-0  top-50 bg-white rounded-full p-2.5 shadow-lg hover:shadow-xl transition-shadow"
        > 
          <div className="h-4 w-4 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full" />
        </button>
      </nav>

      {/* Main Content Area */}
      <div className={`flex-1 p-6 lg:ml-54 mt-16 lg:mt-0 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <h2 className="text-2xl font-bold mb-4">Account Settings</h2>

        {/* Profile Picture Change */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Profile Picture</h3>
          <div className="flex items-center space-x-4">
            <img src={profilePic} alt="Profile" className="w-24 h-24 rounded-full" />
            <label className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600">
              Update Profile Picture
              <input type="file" className="hidden" onChange={handleProfilePicChange} />
            </label>
          </div>
        </div>

        {/* Name Change */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Name</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded border border-gray-300"
          />
        </div>

        {/* Email Change */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Email</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded border border-gray-300"
          />
        </div>

        {/* Currency Change */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Currency</h3>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full p-2 rounded border border-gray-300"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="INR">INR</option>
            <option value="JPY">JPY</option>
          </select>
        </div>

        {/* Dark Mode Toggle */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Theme</h3>
          <div className="flex items-center space-x-4">
            <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-16 p-2 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-white transform ${
                  darkMode ? 'translate-x-8' : ''
                } transition`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;

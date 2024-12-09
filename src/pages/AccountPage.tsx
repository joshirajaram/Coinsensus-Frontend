import React, { useState } from 'react';

const AccountPage: React.FC = () => {
  const [profilePic, setProfilePic] = useState<string>('https://img.icons8.com/?size=100&id=42217&fiormat=png&color=575799');
  const [name, setName] = useState<string>(localStorage.getItem('username') || "");
  const [email, setEmail] = useState<string>(localStorage.getItem('username')+'@gmail.com');
  const [currency, setCurrency] = useState<string>('USD');
  const [darkMode, setDarkMode] = useState<boolean>(false);

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
    <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
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
  );
};

export default AccountPage;
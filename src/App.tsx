// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth'; // Assuming this is the login/signup component
import LandingPage from './pages/LandingPage';
import GroupsPage from './pages/GroupsPage';
import FriendsPage from './pages/FriendsPage';
import ActivityPage from './pages/ActivityPage';
import AccountPage from './pages/AccountPage';
import HomePage from './pages/HomePage';
import AddExpense from 'components/AddExpense';

const App: React.FC = () => {
  // State to manage whether to show landing page or auth component
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Function to handle successful authentication
  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };
  
  return (
  <>
  {isAuthenticated ? (
    <BrowserRouter>
      {/* Modal can be rendered outside of Routes */}
      {isModalOpen && (
        <AddExpense onClose={handleCloseModal} />
      )}
      <Routes>
        <Route path="/" element={<LandingPage />}>
          <Route index element={<HomePage />} />
          <Route path="groups" element={<GroupsPage />} />
          <Route path="friends" element={<FriendsPage />} />
          <Route path="activity" element={<ActivityPage />} />
          <Route path="account" element={<AccountPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  ) : (
    <Auth onAuthenticate={handleAuthentication} />
  )}
</>)
};

export default App;
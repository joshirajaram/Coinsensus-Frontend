// src/App.tsx
import AddExpense from 'components/AddExpense';
import Auth from 'components/Auth';
import AccountPage from 'pages/AccountPage';
import ActivityPage from 'pages/ActivityPage';
import FriendsPage from 'pages/FriendsPage';
import GroupsPage from 'pages/GroupsPage';
import HomePage from 'pages/HomePage';
import LandingPage from 'pages/LandingPage';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// Create a wrapper component to use navigation
const AppContent: React.FC<{
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  isModalOpen: boolean;
  handleCloseModal: () => void;
}> = ({ isAuthenticated, setIsAuthenticated, isModalOpen, handleCloseModal }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <>
      {isModalOpen && <AddExpense onClose={handleCloseModal} />}
      <Routes>
        <Route path="/" element={<LandingPage handleSignOut={handleSignOut} />}>
          <Route index element={<HomePage />} />
          <Route path="groups" element={<GroupsPage />} />
          <Route path="friends" element={<FriendsPage />} />
          <Route path="activity" element={<ActivityPage />} />
          <Route path="account" element={<AccountPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

// Main App component
const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleAuthentication = () => setIsAuthenticated(true);

  return (
    <>
      {isAuthenticated ? (
        <BrowserRouter>
          <AppContent
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            isModalOpen={isModalOpen}
            handleCloseModal={handleCloseModal}
          />
        </BrowserRouter>
      ) : (
        <Auth onAuthenticate={handleAuthentication} />
      )}
    </>
  );
};

export default App;
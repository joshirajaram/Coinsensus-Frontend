// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import GroupsPage from './pages/GroupsPage';
import FriendsPage from './pages/FriendsPage';
import ActivityPage from './pages/ActivityPage';
import AccountPage from './pages/AccountPage';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}>
          <Route index element={<HomePage />} />
          <Route path="groups" element={<GroupsPage />} />
          <Route path="friends" element={<FriendsPage />} />
          <Route path="activity" element={<ActivityPage />} />
          <Route path="account" element={<AccountPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
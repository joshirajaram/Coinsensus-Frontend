import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth'; // Assuming this is the login/signup component
import LandingPage from './components/LandingPage';
import AddExpense from './components/AddExpense';

const App: React.FC = () => {
  // State to manage whether to show landing page or auth component
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/addexpense"
              element={isModalOpen ? <AddExpense onClose={handleCloseModal} /> : null}
            />
          </Routes>
        </BrowserRouter>
      ) : (
        <Auth onAuthenticate={handleAuthentication} />
      )}
    </>
  );
};

export default App;

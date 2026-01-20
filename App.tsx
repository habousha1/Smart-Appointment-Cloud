
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import { User } from './types';
import { storage } from './services/storage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    refreshUser();
  }, []);

  const refreshUser = () => {
    const session = storage.getCurrentUser();
    if (session) {
      // On récupère la version la plus fraîche depuis la liste des utilisateurs
      const allUsers = storage.getUsers();
      const freshUser = allUsers.find(u => u.id === session.id);
      if (freshUser) {
        setUser(freshUser);
        storage.setSession(freshUser);
      } else {
        setUser(session);
      }
    }
  };

  const handleAuthSuccess = (loggedUser: User) => {
    setUser(loggedUser);
    storage.setSession(loggedUser);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    storage.setSession(null);
    setUser(null);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'login':
        return <Auth initialMode="login" onAuthSuccess={handleAuthSuccess} />;
      case 'register':
        return <Auth initialMode="register" onAuthSuccess={handleAuthSuccess} />;
      case 'dashboard':
        return user ? <Dashboard user={user} onRefreshUser={refreshUser} /> : <Home onNavigate={setCurrentPage} />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <Layout user={user} onLogout={handleLogout} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
};

export default App;

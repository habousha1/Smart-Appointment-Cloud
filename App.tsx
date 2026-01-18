
import React, { useState, useEffect } from 'react';
import { User, ProProfile, Appointment, AppState, AppointmentStatus } from './types';
import { getDB, saveDB } from './db';
import Layout from './components/Layout';
import Home from './pages/Home';
import Auth from './pages/Auth';
import ProDashboard from './pages/ProDashboard';
import ClientDashboard from './pages/ClientDashboard';

const App: React.FC = () => {
  const [db, setDb] = useState<AppState>(getDB());
  const [currentPage, setCurrentPage] = useState<string>('home');

  // Persistence side effect
  useEffect(() => {
    saveDB(db);
  }, [db]);

  const handleAuthSuccess = (user: User) => {
    setDb(prev => ({ ...prev, currentUser: user }));
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setDb(prev => ({ ...prev, currentUser: null }));
    setCurrentPage('home');
  };

  const handleRegister = (newUser: User, proProfile?: ProProfile) => {
    setDb(prev => ({
      ...prev,
      users: [...prev.users, newUser],
      proProfiles: proProfile ? [...prev.proProfiles, proProfile] : prev.proProfiles
    }));
  };

  const handleUpdateProProfile = (updatedProfile: ProProfile) => {
    setDb(prev => ({
      ...prev,
      proProfiles: prev.proProfiles.map(p => p.userId === updatedProfile.userId ? updatedProfile : p)
    }));
  };

  const handleUpdateAppointmentStatus = (id: string, status: AppointmentStatus) => {
    setDb(prev => ({
      ...prev,
      appointments: prev.appointments.map(a => a.id === id ? { ...a, status } : a)
    }));
  };

  const handleBookAppointment = (proId: string, date: string, time: string) => {
    if (!db.currentUser) return;
    const newApt: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      proId,
      clientId: db.currentUser.id,
      date,
      time,
      status: 'PENDING'
    };
    setDb(prev => ({ ...prev, appointments: [...prev.appointments, newApt] }));
  };

  const handleCancelAppointment = (id: string) => {
    handleUpdateAppointmentStatus(id, 'CANCELLED');
  };

  const renderPage = () => {
    if (currentPage === 'home') {
      return <Home onNavigate={setCurrentPage} />;
    }
    
    if (currentPage === 'login' || currentPage === 'register') {
      return (
        <Auth 
          mode={currentPage as 'login' | 'register'} 
          onAuthSuccess={handleAuthSuccess}
          onNavigate={setCurrentPage}
          users={db.users}
          proProfiles={db.proProfiles}
          onRegister={handleRegister}
        />
      );
    }

    if (currentPage === 'dashboard') {
      if (!db.currentUser) {
        setCurrentPage('login');
        return null;
      }
      return db.currentUser.role === 'PRO' ? (
        <ProDashboard 
          user={db.currentUser} 
          db={db}
          onUpdateProProfile={handleUpdateProProfile}
          onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
        />
      ) : (
        <ClientDashboard 
          user={db.currentUser} 
          db={db}
          onBookAppointment={handleBookAppointment}
          onCancelAppointment={handleCancelAppointment}
        />
      );
    }

    return <Home onNavigate={setCurrentPage} />;
  };

  return (
    <Layout 
      user={db.currentUser} 
      onLogout={handleLogout} 
      onNavigate={setCurrentPage}
    >
      {renderPage()}
    </Layout>
  );
};

export default App;

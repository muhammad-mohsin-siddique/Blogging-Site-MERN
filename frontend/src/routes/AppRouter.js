//handle routes


import React, { useState, useEffect } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Dashboard from '../pages/Dashboard';

const AppRouter = () => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('blogUsers')) {
      localStorage.setItem('blogUsers', JSON.stringify([]));
    }
    
    const session = localStorage.getItem('blogSession');
    if (session) {
      setUser(JSON.parse(session));
    }
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem('blogSession', JSON.stringify(userData));
    setUser(userData);
  };

  const handleSignup = (userData) => {
    localStorage.setItem('blogSession', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('blogSession');
    setUser(null);
  };

  return (
    <div className="app-router">
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : isLogin ? (
        <Login 
          onLogin={handleLogin} 
          onSwitchToSignup={() => setIsLogin(false)} 
        />
      ) : (
        <Signup 
          onSignup={handleSignup} 
          onSwitchToLogin={() => setIsLogin(true)}
        />
      )}
    </div>
  );
};

export default AppRouter;
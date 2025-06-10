
import React from 'react';
import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome, {user.name}!</h1>
        <button onClick={onLogout} className="logout-button">
          Logout
        </button>
      </header>
      
      <main className="dashboard-content">
        <div className="dashboard-card">
          <h2>Dashboard</h2>
          <p>You are successfully logged in!</p>
          <div className="user-info">
            <h3>User Information:</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Name:</strong> {user.name}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

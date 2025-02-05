import React from 'react';
import Dashboard from '../components/Dashboard';

const DashboardPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold">Your Dashboard</h1>
      <Dashboard />
    </div>
  );
};

export default DashboardPage;

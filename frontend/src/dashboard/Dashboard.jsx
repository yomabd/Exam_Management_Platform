// Dashboard.jsx
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';


const Dashboard = () => {
  return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header title="Dashboard" />
          
        </div>
      </div>
  );
};

export default Dashboard;

// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2">
      <nav>
        <Link to="/dashboard" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Dashboard</Link>
        <Link to="/create-exam" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Create Exam</Link>
        <Link to="/view-results" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">View Results</Link>
        <Link to="/exams" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Exams</Link>
      </nav>
    </div>
  );
};

export default Sidebar;

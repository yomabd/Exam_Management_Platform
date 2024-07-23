// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CandidateSidebar = ({handleSelectedComponent, selectedComponent, barOn}) => {
  return (
    <div className={`bg-gray-800 text-white -64 space-y-6 py-7 px-2 md:min-h-screen fixed hidden md:block ${barOn?'max-md:block':''} top-0 left-0 w-[200px] pt-[130px] bottom-0`}>     
      <nav>
        <Link className={`block py-2.5 px-4 mt-20 rounded transition duration-200 hover:bg-gray-700 ${selectedComponent === 'dashboard'?'bg-gray-700':''}`} onClick={()=>handleSelectedComponent("dashboard")}>Dashboard</Link>
        <Link className={`block py-2.5 px-4 mt-10 rounded transition duration-200 hover:bg-gray-700 ${selectedComponent ==='profile'?'bg-gray-700':''}`} onClick={()=>handleSelectedComponent("profile")}>Profile</Link>
        <Link className={`block py-2.5 px-4  mt-10 rounded transition duration-200 hover:bg-gray-700 ${selectedComponent==='settings'?'bg-gray-700':''}`} onClick={()=>handleSelectedComponent("settings")}>Settings</Link>
      </nav>
    </div>
  );
};

export default CandidateSidebar;

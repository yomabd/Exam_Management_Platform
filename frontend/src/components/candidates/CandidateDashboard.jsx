// Dashboard.jsx
import React from 'react';
import { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CandidateSidebar from './CandidateSidebar';
import Header from '../dashboard/Header';



const CandidateDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState('dashboard');
  const [qid, setQid] = useState('');
  const [questionBanks, setQuestionBanks] = useState([]);
  const questionBanksUrl = import.meta.env.VITE_APP_QUESTIONBANK_URL;
  const [loading, setLoading] = useState(true);
  const [barOn, setBarOn]  = useState(false);
  const handleBarclick = ()=> setBarOn(prev=> !prev);

  const handleSelectedComponent = (componentName)=>{
    setSelectedComponent(componentName);
   

  }
  return (
      <div className="flex h-screen w-full p-6 md:pl-[236px] max-md:text-sm">
        <CandidateSidebar className="" handleSelectedComponent={handleSelectedComponent}
        selectedComponent={selectedComponent}
        barOn={barOn}
        />
        <div className="flex-1 w-full flex flex-col pr-6">
          <Header title={selectedComponent==="dashboard"?"Dashboard":selectedComponent==="profile"?'Profile':"Settings"} 
          handleBarclick={handleBarclick}
          barOn ={barOn}
          />
          <div className='mt-12'>

        <h1>HELLLOOOOOOOOOO</h1>
        
          </div>

          
          </div>
          <ToastContainer />

      </div>
  );
};

export default CandidateDashboard;

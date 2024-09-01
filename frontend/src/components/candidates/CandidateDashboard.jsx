import React from 'react';
import { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CandidateSidebar from './CandidateSidebar';
import Header from '../dashboard/Header';
import FetchExams from './FetchExams';

const CandidateDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [barOn, setBarOn] = useState(false);

  const handleBarclick = () => setBarOn((prev) => !prev);

  const handleSelectedComponent = (componentName) => {
    setSelectedComponent(componentName);
  };

  return (
    <div
      className="flex h-screen w-full p-1 md:p-6 md:pl-[236px] max-md:text-sm"
      onClick={() => barOn && setBarOn(false)}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <CandidateSidebar
          className=""
          handleSelectedComponent={handleSelectedComponent}
          selectedComponent={selectedComponent}
          barOn={barOn}
        />
      </div>
      <div className="flex-1 w-full flex flex-col md:pr-4">
        <Header
          title={
            selectedComponent === "dashboard"
              ? "Dashboard"
              : selectedComponent === "profile"
              ? "Profile"
              : "Settings"
          }
          handleBarclick={handleBarclick}
          barOn={barOn}
        />
        {selectedComponent === "dashboard" ? (
          <div className="mt-[100px]">
            <FetchExams loading={loading} setLoading={setLoading} />
          </div>
        ) : selectedComponent === "profile" ? (
          <div className="flex justify-center items-center min-h-screen text-3xl font-extralight animate-pulse">
            Relax!!! Available shortly
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-screen text-3xl font-extralight animate-pulse">
            Under Construction
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default CandidateDashboard;

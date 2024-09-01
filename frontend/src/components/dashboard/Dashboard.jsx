// Dashboard.jsx
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useState } from 'react';
import CreateExamPage from './CreateExamPage';
import ViewResultsPage from './ViewResultsPage';
import ExamsPage from './ExamsPage';
import CreateChapterPage from './CreateChapterPage';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DashboardCard } from './FormComponents';
import DashboardContent from './DashboardContent';



const Dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState('dashboard');
  const [qid, setQid] = useState('');
  const [questionBanks, setQuestionBanks] = useState([]);
  const questionBanksUrl = import.meta.env.VITE_APP_QUESTIONBANK_URL;
  const [loading, setLoading] = useState(true);
  const [barOn, setBarOn]  = useState(false);
  const [showCandidate, setShowCandidate] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const handleBarclick = ()=> setBarOn(prev=> !prev);

  const handleSelectedComponent = (componentName)=>{
    setQid(null);
    setSelectedComponent(componentName);
   

  }
  return (
      <div className="flex min-h-screen w-screen md:pl-[236px] max-md:text-sm"
      onClick={()=> 
        {
          barOn && setBarOn(false);
      }}
      >
        <div onClick={(e) => e.stopPropagation()}>
        <Sidebar className="" handleSelectedComponent={handleSelectedComponent}
        selectedComponent={selectedComponent}
        barOn={barOn}
        />
        </div>
        <div className="flex-1 w-full flex flex-col">
          <Header title={selectedComponent==="dashboard"?"Dashboard":selectedComponent==="create-exam"?'Create Exam':selectedComponent==="view-results"?"View Results":"Exams"} 
          handleBarclick={handleBarclick}
          barOn ={barOn}
          />
          <div className='mt-12'>
          <h1 className="mt-16 pl-6 text-xl font-bold mb-4 md:hidden capitalize border-b-2 rounded-3xl">{selectedComponent}</h1>

          { 
          qid ? <CreateChapterPage 
          qid={qid}
          setExamsComponent={()=>handleSelectedComponent('exams')}
          setQid = {setQid}
          />
          : selectedComponent === "create-exam"
             ? <CreateExamPage  
             setQid={setQid}
             setDashboardComponent = {()=>handleSelectedComponent('dashboard')}
             />:
             selectedComponent === "view-results"?<ViewResultsPage/>:
             selectedComponent === "exams" ? <ExamsPage/>:showCandidate?
             <div className = 'max-w-4xl mx-auto p-6 min-h-96 mt-12'>
              <button className='bg-black max-auto py-2 px-6 text-white rounded-md hover:bg-gray-600 mb-2'
              onClick={()=>setShowCandidate(false)}
              >Back</button>
             <DashboardContent
             questionBanks={questionBanks}
             setQuestionBanks ={setQuestionBanks}
             questionBanksUrl = {questionBanksUrl}
             loading = {loading}
             setLoading = {setLoading}

             />
             
           </div>  
             : showResult?<div className='flex flex-col justify-center items-center min-h-screen '>
              <button className='bg-black max-auto py-2 px-6 text-white rounded-md hover:bg-gray-600 mb-2'
              onClick={()=>setShowResult(false)}
              >Back</button>
              <h1 className='text-3xl font-semibold animate-pulse'>COMING SOON</h1>
             </div>
             
             :<div className = 'max-w-4xl mx-auto p-6 min-h-96 mt-12'>
              <div className='flex gap-2 items-center'>

              <DashboardCard showCandidate = {()=>{setShowCandidate(true)}}> View and Assign Exams</DashboardCard> 
              <DashboardCard showCandidate = {()=>{setShowResult(true)}}> Check results</DashboardCard> 
              </div>
             
                     
            
              </div>
          
           
          
          }
        
          </div>

          
          </div>
          <ToastContainer />

      </div>
  );
};

export default Dashboard;

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
import { ExamCard } from './FormComponents';
import DashboardContent from './DashboardContent';
// import { useHistory } from 'react-router-dom';
// import CreateExamPage from './CreateExamPage';


const Dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState('dashboard');
  const [qid, setQid] = useState('');
  const [questionBanks, setQuestionBanks] = useState([]);
  const questionBanksUrl = import.meta.env.VITE_APP_QUESTIONBANK_URL;
  const [loading, setLoading] = useState(true);
  // const history = useHistory();
  const handleSelectedComponent = (componentName)=>{
    setSelectedComponent(componentName);
    // console.log('selected component is ',componentName)
    // window.history.pushState({}, '', `/${componentName}`);

  }
  return (
      <div className="flex h-screen">
        <Sidebar className="hidden" handleSelectedComponent={handleSelectedComponent}
        selectedComponent={selectedComponent} />
        <div className="flex-1 flex flex-col md:ml-40 lg:ml-48 pr-6">
          <Header title={selectedComponent==="dashboard"?"Dashboard":selectedComponent==="create-exam"?'Create Exam':selectedComponent==="view-results"?"View Results":"Exams"}  />
          <div className='mt-12'>

          { 
          qid ? <CreateChapterPage qid={qid}/>: selectedComponent === "create-exam"
             ? <CreateExamPage  setQid={setQid}/>:
             selectedComponent === "view-results"?<ViewResultsPage/>:
             selectedComponent === "exams" ? <ExamsPage/>:<div className = 'max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md min-h-96 mt-24'> <ExamCard className=' h-16 sm:w-20 sm:h-12 lg:w-24 lg:h-16 text-white italic flex justify-center items-center hover:cursor-pointer  hover:bg-gray-300 '> Assign Exam</ExamCard> 
             <div>
              <DashboardContent
              questionBanks={questionBanks}
              setQuestionBanks ={setQuestionBanks}
              questionBanksUrl = {questionBanksUrl}
              loading = {loading}
              setLoading = {setLoading}

              />
              
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

// Dashboard.jsx
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useState } from 'react';
import CreateExamPage from './CreateExamPage';
import ViewResultsPage from './ViewResultsPage';
import ExamsPage from './ExamsPage';
import CreateChapterPage from './CreateChapterPage';
// import { useHistory } from 'react-router-dom';
// import CreateExamPage from './CreateExamPage';


const Dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState('');
  const [qid, setQid] = useState('');
  // const history = useHistory();
  const handleSelectedComponent = (componentName)=>{
    setSelectedComponent(componentName);
    console.log('selected component is ',componentName)
    // window.history.pushState({}, '', `/${componentName}`);

  }
  return (
      <div className="flex h-screen">
        <Sidebar handleSelectedComponent={handleSelectedComponent}
        selectedComponent={selectedComponent} />
        <div className="flex-1 flex flex-col md:ml-48">
          <Header title="Dashboard" />
          { 
          qid ? <CreateChapterPage qid={qid}/>: selectedComponent === "create-exam"
             ? <CreateExamPage qid = {qid} setQid={setQid}/>:
             selectedComponent === "view-results"?<ViewResultsPage/>:
             selectedComponent === "exams" ? <ExamsPage/>:""
          
           
          
}
        

          
        </div>
      </div>
  );
};

export default Dashboard;

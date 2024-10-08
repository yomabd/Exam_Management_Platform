import React from 'react'
import {Routes, Route} from 'react-router-dom';
import CreateChapterPage from './components/dashboard/CreateChapterPage';
import CreateExamPage from './components/dashboard/CreateExamPage';
import Dashboard from './components/dashboard/Dashboard';
import ViewResultsPage from './components/dashboard/ViewResultsPage';
import ExamPage from './components/candidates/ExamPage';
import ExamsPage from './components/dashboard/ExamsPage';
import OverallExamPage from './components/candidates/OverallExamPage';
import PrivateRoute from './components/authcomponents/PrivateRoute';
import CandidateSignin from './components/authcomponents/CandidateSignin';
import CandidateSignup from './components/authcomponents/CandidateSignup';
import AdminSignin from './components/authcomponents/AdminSignin';
import AdminSignup from './components/authcomponents/AdminSignup';
import CandidateDashboard from './components/candidates/CandidateDashboard';
import FetchExams from './components/candidates/FetchExams';
import LandingPage from './components/LandingPage';


function App() {
  return (
    <div className="">
      {/* .......Public route.......... */}
    <Routes>
      <Route path='/'  exact element={<LandingPage/>} />
      <Route path='/register/candidate' element={<CandidateSignup/>} />
      <Route path='/admin'  exact element={<AdminSignin/>} />
      <Route path='/candidate'  exact element={<CandidateSignin/>} />
      <Route path='/register/admin' element={<AdminSignup/>} />
      
      {/* .......Private route.......... */}

      <Route element={<PrivateRoute/>}>      
      <Route path='/admin/dashboard' element={<Dashboard/>}/>
      <Route path='/candidate/dashboard' element={<CandidateDashboard/>}/>
      <Route path= "/start-exam/:id" element={<OverallExamPage />}/>
      </Route>


    </Routes>

 </div>
  )
}

export default App

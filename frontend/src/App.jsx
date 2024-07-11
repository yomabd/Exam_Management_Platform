import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Signin from './components/authcomponents/Signin';
import Signup from './components/authcomponents/Signup';
import CreateChapterPage from './components/dashboard/CreateChapterPage';
import CreateExamPage from './components/dashboard/CreateExamPage';
import Dashboard from './components/dashboard/Dashboard';
import ViewResultsPage from './components/dashboard/ViewResultsPage';
import ExamPage from './components/candidates/ExamPage';
import ExamsPage from './components/dashboard/ExamsPage';
import FetchQuestions from './components/candidates/FetchQuestions';
import OverallExamPage from './components/candidates/OverallExamPage';
import PrivateRoute from './components/authcomponents/PrivateRoute';



function App() {

  return (
    // <Signin/>
    <div className="">
      {/* .......Public route.......... */}
    <Routes>
      <Route path='/'  exact element={<Signin/>} />
      <Route path='/signup' element={<Signup/>} />
      
      {/* .......Private route.......... */}

      <Route element={<PrivateRoute/>}>      
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/create-exam' element={<CreateExamPage/>}/>
      <Route path='/view-results' element={<ViewResultsPage />}/>
      <Route path='/exams' element={<ExamsPage/>}/>
      <Route path='/fetchQuestionBank' element={<FetchQuestions/>}/>
      <Route path='/:qid/create-chapters/' element={<CreateChapterPage />}/>
      <Route path= "/exam" element={<ExamPage/>}/>
      <Route path= "/start-exam" element={<OverallExamPage />}/>
      <Route path= "/candidate-exam" element={<FetchQuestions/>}/>
      </Route>


    </Routes>
 </div>
  )
}

export default App

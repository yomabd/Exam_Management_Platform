import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Signin from './components/authcomponents/Signin';
import Signup from './components/authcomponents/Signup';
import CreateChapterPage from './components/dashboard/CreateChapterPage';
import CreateExamPage from './components/dashboard/CreateExamPage';
import Dashboard from './components/dashboard/Dashboard';
import ViewResultsPage from './components/dashboard/ViewResultsPage';
import ExamPage from './components/exam/ExamPage';
import ExamsPage from './components/dashboard/ExamsPage';
import FetchQuestions from './FetchQuestions';



function App() {

  return (
    // <Signin/>
    <div className="">
    <Routes>
      <Route path='/'  exact element={<Signin/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/create-exam' element={<CreateExamPage/>}/>
      <Route path='/view-results' element={<ViewResultsPage />}/>
      <Route path='/exams' element={<ExamsPage/>}/>
      <Route path='/fetchQuestionBank' element={<FetchQuestions/>}/>
      <Route path='/:qid/create-chapters/' element={<CreateChapterPage />}/>
      <Route path= "/exam/:id" element={<ExamPage/>}/>


    </Routes>
 </div>
  )
}

export default App

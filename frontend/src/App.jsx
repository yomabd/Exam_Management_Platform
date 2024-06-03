import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Signin from './authcomponents/Signin';
import Signup from './authcomponents/Signup';
import CreateChapterPage from './dashboard/CreateChapterPage';
import CreateExamPage from './dashboard/CreateExamPage';
import Dashboard from './dashboard/Dashboard';
import ViewResultsPage from './dashboard/ViewResultsPage';
import ExamPage from './ExamPage';
import ExamsPage from './dashboard/ExamsPage';
import FetchQuestions from './FetchQuestions';



function App() {

  return (
    // <Signin/>
    <div className="">
    <Routes>
      <Route path='/' element={<Signin/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/create-exam' element={<CreateExamPage/>}/>
      <Route path='/view-results' element={<ViewResultsPage />}/>
      <Route path='/exams' element={<ExamsPage/>}/>
      <Route path='/fetchQuestionBank' element={<FetchQuestions/>}/>
      <Route path='/create-chapters' element={<CreateChapterPage />}/>
      <Route path= "/exam/:id" element={<ExamPage/>}/>


    </Routes>
 </div>
  )
}

export default App

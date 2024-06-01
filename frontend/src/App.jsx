import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Signin from './authcomponents/Signin';
import Signup from './authcomponents/Signup';
import ExamPage from './ExamPage';
import FetchQuestions from './FetchQuestions';



function App() {

  return (
    // <Signin/>
    <div className="">
    <Routes>
      <Route path='/' element={<Signin/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/dashboard' element={<FetchQuestions/>}/>
      <Route path= "/exam/:id" element={<ExamPage/>}/>

    </Routes>
 </div>
  )
}

export default App

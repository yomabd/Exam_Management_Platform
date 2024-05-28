import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Signin from './authcomponents/Signin';
import Signup from './authcomponents/Signup';



function App() {

  return (
    // <Signin/>
    <div className="">
    <Routes>
      <Route path='/' element={<Signin/>} />
      <Route path='/signup' element={<Signup/>} />

    </Routes>
 </div>
  )
}

export default App

import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";

const ExamsPage = () => {
  const [questionBanks, setQuestionBanks]= useState([])
  const questionBanksUrl = 'http://localhost:3005/api/questionBanks'
  const fetchQuestionBanks  = async (url)=>{
      try{

          const response = await fetch(url);
          if (!response.ok){
              throw new Error(`Http error status: ${response.status}`);
          }
          //convert the req body to json
          const data = await response.json();
          console.log(data)
      
          //set the questionBanks state
          setQuestionBanks(data)
      }catch(error){
          console.log('Error fetching data...', error)
      }
  }
  useEffect(()=>{
      fetchQuestionBanks(questionBanksUrl);

  },[])

return (
  <div className='container'>
      <div className="w-full text-center  min-h-screen">
          {/* <div className='flex justify-start gap-2 border-2 border-sky-600 border-solid'><a href={''}></a></div> */}
          {/* <div className='flex justify-center w-full'> */}

          
          
          <h1 className='border-2 w-full'>THIS PAGE IS TO DISPLAY QUESTION BANKS</h1>
          {/* </div> */}
      
          <div className='flex flex-wrap justify-center items-center gap-4 h-screen w-full ' >
         { questionBanks.map(questionBank =>(
                <div>
                  <div key={questionBank._id} className='exam-name w-fit border-2 m-2 text-xs'> 
                  <h3  >Exam name: {questionBank.examname}</h3>
                  <h3>Exam Level: {questionBank.examlevel}</h3>
                  </div>
                  {/* icons goes here */}
                  </div>
                  ))
              }
              </div>
      

      </div>

  </div>
)
}

export default ExamsPage
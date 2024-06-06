import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import {  BiShow } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import Spinner from '../Spinner';
import { ExamCard } from './FormComponents';


const ExamsPage = () => {
  const [questionBanks, setQuestionBanks]= useState([])
  const questionBanksUrl = 'http://localhost:3005/api/questionBanks'
  const [loading, setLoading] = useState(true)
  const [showDelete, setShowDelete] = useState(false)
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
      }finally{
        setLoading(false)
      }
  }
  useEffect(()=>{
      fetchQuestionBanks(questionBanksUrl);

  },[])

return (
  <div className='container'>
      <div className="w-full text-center  min-h-screen bg-white">
          {/* <div className='flex justify-start gap-2 border-2 border-sky-600 border-solid'><a href={''}></a></div> */}
          {/* <div className='flex justify-center w-full'> */}

          
          {loading ? (<Spinner/>): <>
          <h1 className='border-b-2 pb-4 pt-4 w-full text-xl mb-6'>Check below the question banks you set</h1>
          {/* </div> */}
      
          <div className='flex flex-wrap justify-center gap-x-2 min-h-screen w-full ' >
         { questionBanks.map(questionBank =>(
                // <div className='exam-name min-w-[200px] border-2 m-2 h-32 text-md bg-indigo-300'>
                 <ExamCard key={questionBank._id}>
                   <div className='w-full' key={questionBank._id} > 
                  <h3  >Exam name: {questionBank.examname}</h3>
                  <h3>Exam Level: {questionBank.examlevel}</h3>
                  </div>
                  {/* icons goes here */}
                  <div className='flex justify-around mt-4 w-full'>
                    <Link><AiOutlineEdit className='bg-white text-sky-900 rounded-md' size={25}/></Link>
                    <Link><BsInfoCircle className=' bg-white text-green-900 rounded-md' size={25}/></Link>
                    <Link> <BiShow className=' bg-white text-purple-900 rounded-md' size={25} /></Link>
                    <Link onClick={""}> <MdOutlineDelete className=' bg-white text-red-900 rounded-md' size={25}/></Link>
                  </div>
                 </ExamCard>
                  // </div>
                  ))
              }
              </div>
              </>}
      

      </div>
      {deleteClick && (
        <DeleteModal
          deleteClick={deleteClick}
          closeDelete={() => setDeleteClick(false)}
          id={currentId}
        />
      )}

  </div>
)
}

export default ExamsPage
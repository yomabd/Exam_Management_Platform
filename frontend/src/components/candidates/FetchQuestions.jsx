import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, ExamCard } from '../dashboard/FormComponents';

const FetchQuestions = () => {
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
    <div className='container '>
        <div className="mx-auto p-6 bg-white shadow-md rounded-md relative">
        <h1 className="text-5xl font-logo ml-2 z-50 absolute left-0">Exemp</h1>
            {/* <div className='flex justify-start gap-2 border-2 border-sky-600 border-solid'><a href={''}></a></div> */}
            {/* <div className='flex justify-center w-full'> */}

            
            
            <h1 className='border-b-2 w-full text-2xl text-center mb-6 p-4'>See below your scheduled Exams</h1>
            {/* </div> */}
        
            <div className='flex flex-wrap justify-center items-center gap-4 w-full bg-gray-800 min-h-screen p-6' >
           { questionBanks.map((questionBank,index) =>(
                   <ExamCard key={index} className='p-4'>
                     <div  className='mb-4 font-semibold text-xs  '>
                    <h3 className='m-2'  >Exam name: {questionBank.examname}</h3>
                    <h3 className='m-2 mb-4'>Exam Level: {questionBank.examlevel}</h3>
                    <Link to={`/start-exam`} >
                    <Button className="w-1/2 mx-auto">
                        START
                    </Button>
                    </Link>
                    </div>

                   </ExamCard>
                    ))
                }
                </div>
        

        </div>

    </div>
  )
}

export default FetchQuestions;
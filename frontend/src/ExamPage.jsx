import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const ExamPage = () => {
    const [questions, setQuestions]= useState([])
    const [currentQuestion, setCurrentQuestion]=useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [examName, setExamName] = useState('')
    const [examLevel, setExamLevel] = useState('')
    const {id} = useParams()
    
        const questionsUrl = `http://localhost:3005/api/questionBanks/${id}`
        const fetchQuestions  = async (url)=>{
            try{
    
                const response = await axios(url);
                if (!response.data){
                    throw new Error(`Http error status: ${response.status}`);
                }
                //convert the req body to json
                // const data = await response.json();
                // console.log(data)
            
                //set the questions state
                // setQuestions(data.questions)
                 setQuestions(response.data.questions)
                 setExamLevel(response.data.examlevel)
                 setExamName(response.data.examname)
                
                // console.log(questions)
            }catch(error){
                console.log('Error fetching data...', error)
                setError(true)
            }
        }
        useEffect(()=>{
            fetchQuestions(questionsUrl);
            setLoading(false)
            console.log(questions)
    
        },[])



  return (
    <div className='min-h-screen w-screen flex flex-col items-center justify-center'>
        <div className='grid items-center'>
        <button className='text-white bg-black ' onClick={()=>{window.history.back()}}>BACK</button>
        <h1 className='font-bold text-3xl'>EXAMINATION PAGE</h1>
        </div>
        {
            loading ? (<div className="grid items-center">
            <h1>LOADING...</h1>
        </div>) : ( <div className='text-center'>
            <h2 className='font-bold text-xl'>{examName}</h2>
                    <h3 className='font-bold text-l'>{examLevel}</h3>
            {Array.isArray(questions) && questions.length>0?
            questions.map((question,index)=>(
                <div key={index}>        
                    
                <p className=''>{index+1}.  {question.question}</p>
                {
                    question.options.map((option,index)=>(<div className="block">
                        <input key={index} type="radio" name="userOption" id={index} value={option} />
                        <label>{option}</label>
                        </div>
                    ))

                }
                </div>
            )): "No questions found!"} </div>) 
        } 
        </div>

  )
        
}

export default ExamPage
// Example code
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, ExamCard } from '../dashboard/FormComponents';
import axios from 'axios';
import OverallExamPage from './OverallExamPage';

const FetchExams = () => {
    const [questionBanks, setQuestionBanks] = useState([]);
    const [examStarted, setExamStarted] = useState(false);
    const questionBanksUrl = import.meta.env.VITE_APP_CANDIDATE_EXAM_URL;
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    const fetchQuestionBanks = async (url) => {
        try {
            const response = await axios.get(url, { headers });
            if (!response) {
                throw new Error(`Http error status: ${response.status}`);
            }
            const data = await response.data;
            setQuestionBanks(data);
        } catch (error) {
            console.log('Error fetching data...', error);
        }
    }

    useEffect(() => {
        fetchQuestionBanks(questionBanksUrl);
    }, []);
    return (
        <div className='w-full h-screen'>
            <div className="mx-auto">
                <h1 className='border-b-4 rounded-2xl w-full text-2xl md:text-3xl font-extralight text-center mb-6 p-4'>
                    See below your scheduled Exams
                </h1>
                <div className='flex max-md:flex-wrap justify-start w-full p-4 max-sm:p-2 gap-2'>
                    {questionBanks.map((questionBank, index) => (
                        <ExamCard key={index} className='pl-2 md:w-56 w-48 min-h-36 max-sm:w-36'>
                            <div className='font-extralight text-xs md:text-sm flex flex-col justify-around space-y-2'>
                                <h3>Exam name: {questionBank.examname}</h3>
                                <h3 >Exam Level: {questionBank.examlevel}</h3>
                                <Link to={`/start-exam/${questionBank._id}`} className ='text-center'>
                                    <Button className="md:p-2 w-24 font-medium md:w-1/2">
                                        START
                                    </Button>
                                </Link>
                            </div>
                        </ExamCard>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FetchExams;

// Example code
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, ExamCard } from '../dashboard/FormComponents';
import axios from 'axios';

const FetchExams = () => {
    const [questionBanks, setQuestionBanks] = useState([]);
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
        <div className='container'>
            <div className="mx-auto p-6 bg-white w-full border-2 shadow-md rounded-md">
                <h1 className='border-b-4 rounded-2xl w-full text-2xl md:text-3xl font-extralight text-center mb-6 p-4'>
                    See below your scheduled Exams
                </h1>
                <div className='flex flex-wrap gap-2 md:gap-4 justify-start w-full p-4'>
                    {questionBanks.map((questionBank, index) => (
                        <ExamCard key={index} className='p-2 md:p-4'>
                            <div className='font-semibold text-xs'>
                                <h3 className='m-2'>Exam name: {questionBank.examname}</h3>
                                <h3 className='m-2 mb-4'>Exam Level: {questionBank.examlevel}</h3>
                                <Link to={`/start-exam`}>
                                    <Button className="w-full md:w-1/2 mx-auto">
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

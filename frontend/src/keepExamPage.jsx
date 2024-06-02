import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ExamPage = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [examName, setExamName] = useState('');
    const [examLevel, setExamLevel] = useState('');
    const [userAnswers, setUserAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const { id } = useParams();

    const questionsUrl = `http://localhost:3005/api/questionBanks/${id}`;
    
    const fetchQuestions = async (url) => {
        try {
            const response = await axios(url);
            if (!response.data) {
                throw new Error(`Http error status: ${response.status}`);
            }
            setQuestions(response.data.questions);
            setExamLevel(response.data.examlevel);
            setExamName(response.data.examname);
        } catch (error) {
            console.log('Error fetching data...', error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestions(questionsUrl);
    }, []);

    const handleAnswerChange = (questionIndex, option) => {
        setUserAnswers({ ...userAnswers, [questionIndex]: option });
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handleBack = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleSubmit = () => {
        let correctAnswers = 0;
        questions.forEach((question, index) => {
            if (userAnswers[index] === question.correctAnswer) {
                correctAnswers++;
            }
        });
        setScore(correctAnswers);
        setSubmitted(true);
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center min-h-screen">Error loading data.</div>;
    }

    return (
        <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <button className="text-white bg-black py-2 px-4 rounded" onClick={() => { window.history.back(); }}>BACK</button>
                    <h1 className="font-bold text-3xl text-center">EXAMINATION PAGE</h1>
                </div>
                <h2 className="font-bold text-2xl text-center">{examName}</h2>
                <h3 className="font-bold text-xl text-center mb-4">{examLevel}</h3>
                {submitted ? (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">Results</h2>
                        <p className="text-xl">Your Score: {score} / {questions.length}</p>
                    </div>
                ) : (
                    <div>
                        {Array.isArray(questions) && questions.length > 0 && (
                            <div className="text-left">
                                <div className="mb-4">
                                    <p className="text-lg font-semibold">{currentQuestion + 1}. {questions[currentQuestion].question}</p>
                                    <div className="flex flex-col">
                                        {questions[currentQuestion].options.map((option, index) => (
                                            <label key={index} className="flex items-center mt-2">
                                                <input
                                                    type="radio"
                                                    name={`question-${currentQuestion}`}
                                                    value={option}
                                                    checked={userAnswers[currentQuestion] === option}
                                                    onChange={() => handleAnswerChange(currentQuestion, option)}
                                                    className="mr-2"
                                                />
                                                {option}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex justify-between mt-4">
                                    <button
                                        className="text-white bg-blue-500 py-2 px-4 rounded disabled:opacity-50"
                                        onClick={handleBack}
                                        disabled={currentQuestion === 0}
                                    >
                                        Back
                                    </button>
                                    {currentQuestion < questions.length - 1 ? (
                                        <button
                                            className="text-white bg-blue-500 py-2 px-4 rounded"
                                            onClick={handleNext}
                                        >
                                            Next
                                        </button>
                                    ) : (
                                        <button
                                            className="text-white bg-green-500 py-2 px-4 rounded"
                                            onClick={handleSubmit}
                                        >
                                            Submit
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExamPage;

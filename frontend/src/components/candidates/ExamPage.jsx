import React, { useState, useEffect } from 'react';
import DisplayChapterInstruction from './DisplayChapterInstruction';

const ExamPage = ({chapter,chapterScores, setChapterScores, lastChapter, setTotalSubmission, setCurrentChapter,heading,paragraphs}) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questionNum, setQuestionNum] = useState(1);
    const [showInstruction, setShowInstruction] = useState(true);
    const [userAnswers, setUserAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
 

    useEffect(()=>{
        setQuestions(chapter.questions);
        setCurrentQuestion(0);

    },[chapter])

    const handleAnswerChange = (questionIndex, option) => {
        setUserAnswers({ ...userAnswers, [questionIndex]: option });
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setQuestionNum(questionNum + 1);
        }
    };

    const handleProceed = ()=>{
        setShowInstruction(false);
    }

    const handleBack = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
            setQuestionNum(questionNum - 1);
        }
    };

    const handleSubmit = () => {
        let correctAnswers = 0;
        setQuestionNum(questionNum + 1);
        questions.forEach((question, index) => {
            if (userAnswers[index] === question.correctAnswer) {
                correctAnswers++;
            }
        });
        setChapterScores([...chapterScores,{
            name:chapter.name,
            score:correctAnswers,
            total:chapter.questions.length        
        }])
        console.log(chapterScores);
        console.log([...chapterScores,{
            name:chapter.name,
            score:correctAnswers,
            total:chapter.questions.length        
        }])
        if (lastChapter()){
            setTotalSubmission(true);
        }else {
            setCurrentChapter(prev => prev + 1);
            setShowInstruction(true);        
        }
    };


    return (
        <div className='w-full'>
        
                {
                    showInstruction ? (<DisplayChapterInstruction
                        heading={heading}
                        paragraphs={paragraphs}
                        handleProceed={handleProceed}
                    />): 
                
            <div>
               
                <h2 className="font-bold text-2xl text-center mb-4">{chapter.name}</h2>
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
                                    <p className="text-lg font-semibold">{questionNum}. {questions[currentQuestion].question}</p>
                                    <div className="flex flex-col mt-4">
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
                                <div className="flex justify-between mt-4 absolute bottom-10 right-10 left-10">
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
}
        </div>
    );
};

export default ExamPage;

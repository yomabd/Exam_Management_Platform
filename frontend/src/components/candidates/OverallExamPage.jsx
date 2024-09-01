import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button } from '../dashboard/FormComponents';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExamPage from './ExamPage';
import { useParams } from 'react-router-dom';
import DisplayGeneralInstruction from './DisplayGeneralInstruction';

const OverallExamPage = () => {
  const [questionBank, setQuestionBank] = useState(null);
  const [chapters, setChapters] = useState(null)
  const [agree, setAgree] = useState(false);
  const [chapterLength, setChapterLength] = useState(0);
  const [examTotal, setExamTotal] = useState(0);
  const [totalSubmission, setTotalSubmission] = useState(false);
  const [chapterScores, setChapterScores] = useState([]);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [displayGeneralInst, setDisplayGeneralInst] = useState(true);
  const {id} = useParams();
  const url = `${import.meta.env.VITE_APP_CANDIDATE_EXAM_URL}/${id}`;  
  const token = localStorage.getItem('token');
  const headers = {Authorization: `Bearer ${token}`};

  const fetchQuestionBank = async (url) => {
    try {
      const response = await axios.get(url, {headers});
      if (!response.data) {
        throw new Error(`Http error status: ${response.status}`);
      }
      setQuestionBank(response.data);
      setChapters(response.data.chapters);
      console.log(response.data, " for fetched question bank");
    } catch (error) {
      console.log('error occurred while fetching question bank');
      console.log(`error: ${error}`, error);
    }
  };

  useEffect(() => {
    fetchQuestionBank(url);
  }, [url]);

  useEffect(() => {
    if (chapters) {
      setChapterLength(chapters.length);
    }
  }, [chapters]);

  useEffect(() => {
    if (totalSubmission) {
      let score = 0;
      let total = 0;
      chapterScores.forEach((chapterScore) => {
        score += chapterScore.score;
        total+= chapterScore.total;
      });
      setTotalScore(score);
      setExamTotal(total);
      console.log(totalScore);
    }
  }, [totalSubmission]);

  const handleAgree = () => {
    setAgree(prev => {
      const newAgree = !prev;
      console.log('new agree, ', newAgree);
      return newAgree;
    });
  }

  const handleProceed = () => {
    if (!agree) {
      toast.error('You need to Click the box to agree');
      return;
    }
    setDisplayGeneralInst(false);
  }

  const lastChapter = () => {
    if (currentChapter === chapterLength - 1){
        return true;
    }else return false;
  }

  return (
    <div className='w-screen min-h-screen bg-gray-100 overflow-hidden'>
    <div className='w-full flex flex-col items-center justify-start pt-  p-4 relative'>
         <h1 className="text-3xl max-md:text-2xl text-purple-600 font-logo ml-4 z-50 absolute left-0">Exemp</h1>
      <div className="flex flex-col-reverse justify-between items-center mb-4 min-w-[678px] ">
        <button className="text-white text-xl font-medium leading-none bg-red-600 hover:bg-red-500 py-2 px-4 rounded" onClick={() => { window.history.back(); }}>EXIT</button>
        {/* <h1 className="font-bold text-3xl text-center mb-10">EXAMINATION PAGE</h1> */}
      </div>
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-2 max-sm:p3 md:p-6 min-h-[500px] relative pt-6">
        <span className='absolute left-4 top-2 text-xl max-md:text-lg text-gray-500 italic font-light'>{questionBank?.examname || "exam name"} - <span className='text-sm text-gray-400'>{questionBank?.examlevel || "exam level"} </span> </span>
        {
          displayGeneralInst ? (
            <div className='p-4'>
              {
                questionBank && questionBank.GeneralInstruction ? (
                  <DisplayGeneralInstruction
                  heading = {questionBank.GeneralInstruction.heading}
                  paragraphs={questionBank.GeneralInstruction.paragraphs}
                  handleAgree = {handleAgree}
                  handleProceed = {handleProceed}
                  agree={agree}
                  />
                ) : (
                  <div>
                    <p>NO INSTRUCTIONS YET</p>
                  </div>
                )
              }
            </div>
          ) : totalSubmission ? (
            <div className="w-full flex items-center justify-center flex-col ">
                        <h2 className="text-4xl font-bold">Results</h2>
                        <p className="text-2xl">Your Score: {totalScore} / {examTotal}</p>
                    </div>
          ) : (
            chapters && (
              <ExamPage 
                chapter={chapters[currentChapter]}
                chapterScores={chapterScores} 
                setChapterScores={setChapterScores}
                setTotalSubmission={setTotalSubmission}
                lastChapter={lastChapter}
                setCurrentChapter={setCurrentChapter}
                heading={questionBank.GeneralInstruction.heading}
                paragraphs={questionBank.GeneralInstruction.paragraphs}
              />
            )
          )
        }
      </div>
      <ToastContainer />
    </div>
    </div>
  );
}

export default OverallExamPage;

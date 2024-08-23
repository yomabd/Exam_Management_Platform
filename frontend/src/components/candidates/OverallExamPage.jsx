import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button } from '../dashboard/FormComponents';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExamPage from './ExamPage';
import { useParams } from 'react-router-dom';

const OverallExamPage = ({ questionBak }) => {
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
//   const [id] = useParams()
  const url = import.meta.env.VITE_APP_OVERALLEXAMPAGE_TEST_URL;
  const token = localStorage.getItem('token')
  const headers = {Authorization: `Bearer ${token}`}

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
    <div className='min-h-screen w-screen flex flex-col items-center justify-start pt-14 bg-gray-100 p-4 relative'>
         <h1 className="text-5xl font-logo ml-2 z-50 absolute left-0">Exemp</h1>
      <div className="flex flex-col-reverse justify-between items-center mb-4 min-w-[678px] ">
        <button className="text-white bg-black py-2 px-4 rounded hover:bg-gray-700" onClick={() => { window.history.back(); }}>EXIT</button>
        <h1 className="font-bold text-3xl text-center mb-10">EXAMINATION PAGE</h1>
      </div>
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6 min-h-[500px] relative pt-14 pb-14">
        <span className='absolute left-1 top-1 text-2xl text-blue-600 italic font-light'>{questionBank?.examname || "exam name"} <span className='text-xl text-gray-400'>{questionBank?.examlevel || "exam level"} </span> </span>
        {
          displayGeneralInst ? (
            <div className='p-4'>
              {
                questionBank && questionBank.GeneralInstruction ? (
                  <div className='gap-y-4'>
                    <h1 className='text-xl mb-4 uppercase'>{questionBank.GeneralInstruction.heading}</h1>
                    {questionBank.GeneralInstruction.paragraphs.map((paragraph, index) => (
                      <p className='mt-4' key={index}>{paragraph}</p>
                    ))}
                    <div className='flex justify-between items-center absolute bottom-10 right-10 left-10'>
                      <div className='space-x-4'>
                        <input type="checkbox" name="agreement" id="agree" onChange={handleAgree} checked={agree} />
                        <label htmlFor="agree" className='text-sm'>Check to agree</label>
                      </div>
                      <Button className="text-white bg-blue-500 py-2 px-4 rounded w-fit" onClick={handleProceed}>
                        Proceed
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p>NO INSTRUCTIONS YET</p>
                  </div>
                )
              }
            </div>
          ) : totalSubmission ? (
            <div className="text-center rounded-lg h-[500px] bg-gray-600 grid items-center font-mono text-white">
                        <h2 className="item-start text-2xl font-bold">Results</h2>
                        <p className="self-start text-xl">Your Score: {totalScore} / {examTotal}</p>
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
              />
            )
          )
        }
      </div>
      <ToastContainer />
    </div>
  );
}

export default OverallExamPage;

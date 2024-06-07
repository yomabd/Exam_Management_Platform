import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { BiShow } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import Spinner from '../Spinner';
import { ExamCard } from './FormComponents';
import DeleteModal from '../exam/DeleteModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchQuestionBanks } from './fetchQuestionBankFunction';
import EditExam from '../exam/EditExam';

const ExamsPage = ({handleSelectedComponent}) => {
  const [questionBanks, setQuestionBanks] = useState([]);
  const questionBanksUrl = 'http://localhost:3005/api/questionBanks';
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [showEditExam, setShowEditExam] = useState(false)
  const [qid, setQid] = useState('')
  const [reload, setReload] = useState(false);


  useEffect(() => {
    fetchQuestionBanks(questionBanksUrl, setLoading, setQuestionBanks);
    if (reload){
      fetchQuestionBanks(questionBanksUrl, setLoading, setQuestionBanks);
      setReload(false)
    }
  }, [reload]);

  return (
    <div className='container mx-auto p-4 bg-gray-50 min-h-screen'>
      <div className="w-full text-center bg-white p-6 shadow-lg rounded-md">
        {loading ? (
          <Spinner />
        ) : showEditExam ? (<EditExam 
          closeEditExam= {()=>setShowEditExam(false)}
          showEditExam = {()=>setShowEditExam(true)}
          qid={qid}/>): (
          <>
            <h1 className='text-2xl font-semibold border-b-2 pb-4 pt-4 mb-6'>Check below your available question banks</h1>
            <div className='flex flex-wrap justify-center gap-4'>
              {questionBanks.map(questionBank => (
                <ExamCard key={questionBank._id} className="relative max-w-xs p-4">
                  <div className='mb-4'>
                    <h3 className='text-lg font-medium'>Exam name: {questionBank.examname}</h3>
                    <h3 className='text-lg font-medium'>Exam Level: {questionBank.examlevel}</h3>
                  </div>
                  <div className='flex justify-around absolute translate-y-[50%] bottom-0 space-x-2 z-0'>
                    <Link to="#" 
                    onClick={()=>{
                      setQid(questionBank._id);
                      // qid = {qid}
                      setShowEditExam(true);
                      console.log(`${qid}`);
                    }}
                    ><AiOutlineEdit className='bg-white text-sky-900 p-2 rounded-md shadow-md' size={30} /></Link>
                    <Link to="#"><BsInfoCircle className='bg-white text-green-900 p-2 rounded-md shadow-md' size={30} /></Link>
                    <Link to="#"><BiShow className='bg-white text-purple-900 p-2 rounded-md shadow-md' size={30} /></Link>
                    <Link to="#" onClick={() => {
                    setShowDelete(true);
                    setQid(questionBank._id);
                    console.log(`ID ${qid} was clicked`);
                    }}><MdOutlineDelete className='bg-white text-red-900 p-2 rounded-md shadow-md' size={30} /></Link>
                  </div>
                </ExamCard>
              ))}
              {/* <ToastContainer /> */} /*also works here */

            </div>
          </>
        )}
      </div>
      {showDelete && (
        <DeleteModal
        setReload = {setReload}
        qid={qid}
          closeDeleteModal={() => setShowDelete(false)}
        />
      )}
              
              <ToastContainer />
    </div>
  );
}

export default ExamsPage;

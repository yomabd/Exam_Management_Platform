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
import DisplayExam from '../tree-beards/DisplayExam';

const ExamsPage = () => {
  const [questionBanks, setQuestionBanks] = useState([]);
  const questionBanksUrl = import.meta.env.VITE_APP_QUESTIONBANK_URL;
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [showEditExam, setShowEditExam] = useState(false);
  const [showDisplayExam, setShowDisplayExam]= useState(false);
  const [currentBank, setCurrentBank]= useState(null);
  const [qid, setQid] = useState('');
  const [reload, setReload] = useState(false);

//fetch question bank 
  useEffect(() => {
    fetchQuestionBanks(questionBanksUrl, setLoading, setQuestionBanks);
    if (reload){
      fetchQuestionBanks(questionBanksUrl, setLoading, setQuestionBanks);
      setReload(false)
    }
  }, [reload]);

  

  return (
    <div className='container min-h-screen'>
      <div className="w-full text-center p-6 max-md:p-2">
        {loading ? (
          <Spinner />
        ) : showDisplayExam?(<DisplayExam
          setShowDisplayExam={setShowDisplayExam}
        questionBank={currentBank}
        />): showEditExam ? (<EditExam 
          closeEditExam= {()=>setShowEditExam(false)}
          showEditExam = {()=>setShowEditExam(true)}
          qid={qid}/>): (
          <>
            <h1 className='text-xl md:text-2xl font-semibold border-b-2 pb-4 pt-10 max-md:pt-6 mb-6'>Available question banks</h1>
            <div className='flex flex-wrap justify-start gap-2'>
              {questionBanks.map(questionBank => (
                <ExamCard key={questionBank._id} className="relative">
                  <div className='mb-4'>
                    <h3 className='text-md max-sm:text-sm'>Exam name: {questionBank.examname}</h3>
                    <h3 className='text-md max-sm:text-sm'>Exam Level: {questionBank.examlevel}</h3>
                  </div>
                  <div className='flex justify-around absolute bottom-1 left-0 right-0 space-x-2 z-0'>
                    <Link to="#" 
                    onClick={()=>{
                      setQid(questionBank._id);
                      setShowEditExam(true);
                      // console.log(`${qid}`);
                    }}
                    ><AiOutlineEdit className='bg-white text-sky-900 p-2 rounded-full hover:bg-gray-400 shadow-md' size={30} /></Link>
                    <Link
                    onClick={()=>{
                      setCurrentBank(questionBank)
                      setShowDisplayExam(true);

                    }}
                    to="#"><BsInfoCircle className='bg-white text-green-900 p-2 rounded-full hover:bg-gray-400 shadow-md' size={30} /></Link>
                    <Link to="#"><BiShow className='bg-white text-purple-900 p-2 rounded-full hover:bg-gray-400 shadow-md' size={30} /></Link>
                    <Link to="#" onClick={() => {
                    setShowDelete(true);
                    setQid(questionBank._id);
                    }}><MdOutlineDelete className='bg-white text-red-900 p-2 rounded-full hover:bg-gray-400 shadow-md' size={30} /></Link>
                  </div>
                </ExamCard>
              ))}
              {/* <ToastContainer /> /*also works here */ }

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

import React, { useState, useEffect } from 'react';
import { MdOutlineDelete } from "react-icons/md";
import { IoIosPersonAdd } from "react-icons/io";
import { fetchQuestionBanks } from './fetchQuestionBankFunction';
import Spinner from '../Spinner';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import axios from "axios";
import CandidatesListModal from './CandidatesListModal';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardContent = ({ questionBanks, questionBanksUrl, loading, setLoading, setQuestionBanks }) => {
  const [reload, setReload] = useState(false);
  const [examId, setExamId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState('');
  const examAssignUrl = import.meta.env.VITE_APP_ASSIGN_EXAM_URL;
  const examDetachUrl = import.meta.env.VITE_APP_REMOVE_EXAM_URL;
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchQuestionBanks(questionBanksUrl, setLoading, setQuestionBanks);
      setReload(false);
    };

    fetchData();
  }, [reload, questionBanksUrl, setLoading, setQuestionBanks]);

  const handleOpenModal = (examId, actionType) => {
    setExamId(examId);
    setActionType(actionType);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setExamId('');
    setActionType('');
  };

  const handleAdd = async (candidateId) => {
    try {
      const response = await axios.post(`${examAssignUrl}`, { examId, candidateId }, { headers });
      toast.success(`${actionType} done successfully!`);
      setReload(true);
    } catch (error) {
      console.log(`Error performing ${actionType} operation`, error);
      toast.error(`${actionType} operation failed! ${error.message}`);
    }
  };

  const handleDelete = async (candidateId) => {
    try {
      const response = await axios.delete(`${examDetachUrl}`, {
        headers,
        data: { examId, candidateId }
      });
      toast.success(`${actionType} done successfully!`);
      setReload(true);
    } catch (error) {
      console.log(`Error performing ${actionType} operation`, error);
      toast.error(`${actionType} operation failed! ${error.message}`);
    }
  };

  const handleAction = async (userId) => {
    const candidateId = userId;
    if (actionType === 'add') {
      await handleAdd(candidateId);
    } else {
      await handleDelete(candidateId);
    }
  };

  return (
    <div className='font-light max-md:text-xs'>
      {loading ? (
        <Spinner />
      ) : (
        
        <table className='mx-auto min-w-full border-collapse table'>
          <thead className='table-header-group'>
            <tr className='border-none table-row'>
              <th className='table-cell text-left p-2 bg-gray-100'>Exam Name</th>
              <th className='table-cell text-left p-2 bg-gray-100'>Level</th>
              <th className='table-cell text-left p-2 bg-gray-100'>No of Candidates</th>
              <th className='table-cell text-left p-2 bg-gray-100'>Add Candidate</th>
              <th className='table-cell text-left p-2 bg-gray-100'>Delete Candidate</th>
            </tr>
          </thead>
          {Array.isArray(questionBanks) && questionBanks.length > 0 && (
            <tbody className=' table-row-group'>
              {questionBanks.map((questionBank, index) => (
                <tr
                  key={questionBank._id}
                  className={`border table-row ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                  <td className='table-cell p-2'>{questionBank.examname}</td>
                  <td className='table-cell p-2'>{questionBank.examlevel}</td>
                  <td className='table-cell p-2'>{questionBank.assignedCandidates.length}</td>
                  <td className='table-cell p-2'>
                    <Link onClick={() => handleOpenModal(questionBank._id, 'add')}><IoIosPersonAdd size={25} /></Link>
                  </td>
                  <td className='table-cell p-2'>
                    <Link onClick={() => handleOpenModal(questionBank._id, 'delete')}><MdOutlineDelete size={25} /></Link>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      )}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <CandidatesListModal 
            isOpen={isModalOpen} 
            onClose={handleCloseModal} 
            onAction={handleAction} 
            actionType={actionType}
            setLoading={setLoading}
            headers={headers}
            examId={examId}
          />
        </Modal>
      )}
    </div>
  );
};

export default DashboardContent;

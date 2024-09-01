import React from 'react';
import api from '../../configs/axiosConfig';;
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteModal = ({ closeDeleteModal, qid, setReload }) => {
  const questionBanksUrl = import.meta.env.VITE_APP_QUESTIONBANK_URL;
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleDelete = () => {
    axios
      .delete(`${questionBanksUrl}/${qid}`,{headers})
      .then((response) => {
        toast.success("Question Bank deleted successfully!");
        closeDeleteModal();
        setReload(true);     
        
      })
      .catch((error) => {
        toast.error(`Error: ${error.message}`);
        closeDeleteModal();
      })
      .finally(
        setTimeout(()=>{

            setReload(false);
        },2000)
      )
  };

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50'
      onClick={closeDeleteModal}
    >
      <div
        className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className='text-xl font-semibold mb-4'>Are you sure you want to delete this question bank?</h1>
        <div className='flex justify-center items-center'>
          <button
            onClick={closeDeleteModal}
            className="bg-gray-300 text-gray-700 rounded-md py-2 px-4 m-2 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white rounded-md py-2 px-4 m-2 hover:bg-red-800"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

import React, { useState, useEffect } from 'react';
import axios from 'axios'



const CandidatesListModal = ({ isOpen, onClose, onAction, actionType, token, headers, examId }) => {
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState(null);
  const fetchCandidates = async (headers) => {
    let candidateUrl;
    if (actionType==='add') candidateUrl = import.meta.env.VITE_APP_CANDIDATE_WITHOUT_URL;
    else candidateUrl = import.meta.env.VITE_APP_CANDIDATE_WITH_URL;   
  
    try {
      const response = await axios.get(`${candidateUrl}/${examId}`, { headers });
  
      if (!response) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.data;
      return data;
    } catch (error) {
      console.error("Error fetching candidates: ", error);
      throw error;
    }
  };

  useEffect(() => {
    const getCandidates = async () => {
      try {
        const data = await fetchCandidates(headers);
        setCandidates(data);
      } catch (error) {
        setError(error.message);
      }
    };

    getCandidates();
  }, [token]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg w-1/2">
        <button className="text-right mb-4 text-red-500" onClick={onClose}>Close</button>
        {error ? (
          <div>Error: {error}</div>
        ) : (
          <table className='min-w-full border-collapse block md:table'>
            <thead className='table-header-group'>
              <tr className='border-none md:table-row'>
                <th className='table-cell text-left p-2 bg-gray-100'>First Name</th>
                <th className='table-cell text-left p-2 bg-gray-100'>Last Name</th>
                <th className='table-cell text-left p-2 bg-gray-100'>Email</th>
                <th className='table-cell text-left p-2 bg-gray-100'>Action</th>
              </tr>
            </thead>
            <tbody className='table-row-group'>
              {candidates.map((candidate, index) => (
                <tr
                  key={candidate._id}
                  className={`border table-row ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                  <td className='table-cell p-2'>{candidate.firstname}</td>
                  <td className='table-cell p-2'>{candidate.lastname}</td>
                  <td className='table-cell p-2'>{candidate.email}</td>
                  <td className='table-cell p-2'>
                    <button 
                    className={`${actionType === 'add'?'text-sky-500':'text-red-500'}`}
                    onClick={() => onAction(candidate._id)}>{`${actionType === 'add'?"Add":"Delete"}`}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CandidatesListModal;

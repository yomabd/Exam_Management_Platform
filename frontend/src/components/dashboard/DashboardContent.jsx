import React, { useState, useEffect } from 'react';
import { MdOutlineDelete } from "react-icons/md";
import { IoIosPersonAdd } from "react-icons/io";
import { fetchQuestionBanks } from './fetchQuestionBankFunction';
import Spinner from '../Spinner';
import { Link } from 'react-router-dom';

const DashboardContent = ({ questionBanks, questionBanksUrl, loading, setLoading, setQuestionBanks }) => {
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetchQuestionBanks(questionBanksUrl, setLoading, setQuestionBanks);
    if (reload) {
      fetchQuestionBanks(questionBanksUrl, setLoading, setQuestionBanks);
      setReload(false);
    }
  }, [reload]);

  return (
    <div className='font-light'>
      {loading ? (
        <Spinner />
      ) : (
        <table className='min-w-full border-collapse block md:table'>
          <thead className='block md:table-header-group'>
            <tr className='border md:border-none md:table-row'>
              <th className='block md:table-cell text-left p-2 bg-gray-100'>Exam Name</th>
              <th className='block md:table-cell text-left p-2 bg-gray-100'>Level</th>
              <th className='block md:table-cell text-left p-2 bg-gray-100'>No of Candidates</th>
              <th className='block md:table-cell text-left p-2 bg-gray-100'>Add Candidate</th>
              <th className='block md:table-cell text-left p-2 bg-gray-100'>Delete Candidate</th>
            </tr>
          </thead>
          {Array.isArray(questionBanks) && questionBanks.length > 0 && (
            <tbody className='block md:table-row-group'>
              {questionBanks.map((questionBank, index) => (
                <tr
                  key={questionBank._id}
                  className={`border md:border-none md:table-row ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                  <td className='block md:table-cell p-2'>{questionBank.examname}</td>
                  <td className='block md:table-cell p-2'>{questionBank.examlevel}</td>
                  <td className='block md:table-cell p-2'>{questionBank.assignedCandidates.length}</td>
                  <td className='block md:table-cell p-2'><Link><IoIosPersonAdd size={25} /></Link></td>
                  <td className='block md:table-cell p-2'><Link><MdOutlineDelete size={25} /></Link></td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      )}
    </div>
  );
}

export default DashboardContent;

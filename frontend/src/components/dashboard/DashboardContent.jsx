import React from 'react';
import { MdOutlineDelete } from "react-icons/md";
import { IoIosPersonAdd } from "react-icons/io";
import { useState, useEffect } from 'react';
import { fetchQuestionBanks } from './fetchQuestionBankFunction';
import Spinner from '../Spinner';
import { Link } from 'react-router-dom';




const DashboardContent = ({questionBanks,questionBanksUrl,loading,setLoading, setQuestionBanks}) => {
  // const [questionBanks, setQuestionBanks] = useState([]);
  // const questionBanksUrl = import.meta.env.VITE_APP_QUESTIONBANK_URL;
  // const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false)

  
 //fetch question bank 
 useEffect(() => {
  fetchQuestionBanks(questionBanksUrl, setLoading, setQuestionBanks);
  if (reload){
    fetchQuestionBanks(questionBanksUrl, setLoading, setQuestionBanks);
    setReload(false)
  }
}, [reload]);
  
// console.log(questionBanks, "question banks");
  return (

    <div className='font-light'>
      {

        loading?<Spinner/>:
      
        
        <table className=''>
          <thead>
            <tr>
                <th>Exam Name</th>
                <th>Level</th>
                <th>No of Candidates</th>
                <th>Add candidate</th>
                <th>Delete candidate</th>
            </tr>
          </thead>
            {
             Array.isArray(questionBanks) && questionBanks.length > 0 &&
          <tbody>
           { questionBanks.map(questionBank=>(
            <tr key={questionBank._id}>
            <td>{questionBank.examname}</td>
            <td>{questionBank.examlevel}</td>
            <td>{questionBank.assignedCandidates.length}</td>
            <td><Link><IoIosPersonAdd size={25} /></Link></td>
            <td><Link><MdOutlineDelete size={25}/></Link></td>
            </tr>
            ))}
          </tbody>
            }
        </table>
        }
    </div>
  )
}

export default DashboardContent
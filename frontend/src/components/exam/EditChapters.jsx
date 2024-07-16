import React, { useEffect } from 'react'
import { ExamCard } from '../dashboard/FormComponents'
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Button } from '../dashboard/FormComponents';
import { IoArrowBackCircle } from "react-icons/io5";
import { useState } from 'react';
import EditChapter from '../exam/EditChapter';
import EditCreateChapter from '../dashboard/EditCreateChapter';
import { toast } from 'react-toastify';
import axios from 'axios'
import Spinner from '../Spinner';



const EditChapters = ({qidUrl,setShowEditChapters}) => {
    const [showEditChapter, setShowEditChapter] = useState(false)
    //will be used shortly
    const [showCreateChapter, setShowCreateChapter] = useState(false)
    const [cid, setCid] = useState('')
    const [currentChapter, setCurrentChapter] = useState({});
    const [chapters, setChapters]=useState([]);
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");
    const headers = {
    Authorization: `Bearer ${token}`,
  };

    // question bank id url => qidUrl
    const fetchChapters = async (qidUrl, setChapters) => {
        try {
          const response = await axios.get(`${qidUrl}/chapters`,{headers});
          if (!response.data) {
            throw new Error(`Http error status: ${response.status}`);
          }
          setChapters(response.data)
          setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
          console.log("Error occurred while fetching data ...", error);
          toast.error(`Error: ${error.message}`);
          setLoading(false); // Set loading to false even if there's an error
        }
      };
    
    
    useEffect(()=>{
            fetchChapters(qidUrl, setChapters);
            
                if (reload){
                    fetchChapters(qidUrl, setChapters)
                    setChapters(chapters)
                }
                setReload(false);
            
     


    },[reload,chapters])

    // useEffect(() => {
    //     // if (chapters.length === 0) {
    //         fetchChapters(qidUrl, setRecentChapters)
    //     // }
    // }, [chapters]);

  return (
    <div >
        {
            loading? <Spinner/>:
            showEditChapter ? 
            
            (<EditChapter
                chapter = {currentChapter}
                qidUrl = {qidUrl}
                cid = {cid}
                setReload={setReload}
                setShowEditChapter = {setShowEditChapter}
            />): showCreateChapter ?
            (
                <EditCreateChapter
                qidUrl={qidUrl}
                setReload
                ={setReload}
                setShowCreateChapter = {setShowCreateChapter}
                
                />
            ):
            
            
            (<div className="max-w-2xl mx-auto p-6 bg-white min-h-screen shadow-md rounded-md">
            <div className='space-y-4 mb-8'>
                <Button 
                onClick = {()=>{setShowEditChapters(false)}}
                className="w-32 flex text-white bg-gray-700 hover:bg-gray-800 space-x-2">
                    <IoArrowBackCircle 
                    size={30}
                    className="text-white"/> Back
                </Button>
              <h2 className="text-xl font-bold">Edit Exam Chapters</h2>
                </div>

            { Array.isArray(chapters) && chapters.length > 0? 
                
                <div className='flex'>
                    {
                    chapters.map((chapter,index) => (


            <ExamCard key={index} className="p-4 relative">
                <div className='mb-4'>
                    <h3 className='text-sm font-medium'>Category: {chapter.name}</h3>
                    <h3 className='text-sm font-medium'>No of Questions: {chapter.questions.length}</h3>
                    <h3 className='text-sm font-medium'>Allocated time: {chapter.time}</h3>
                    <Link 
                    onClick={()=>{
                        setCurrentChapter(chapter);
                        setCid(chapter._id);
                        setShowEditChapter(true);

                    }}
                    className='flex justify-center absolute left-[50%] bottom-0 translate-x-[-50%]'><FaEdit size={35} 
                    className="bg-white text-sky-900 p-2 rounded-md shadow-md"
                    /></Link>
                  </div>

            </ExamCard>
                ))
                }
                        </div>

                :( <ExamCard className="p-4 relative">
                <div className='mb-4'>
                    <h3 className='text-sm font-medium'>No chapter available. Create a new chapter</h3>
                   
                    <Link 
                    onClick={()=>{
                        
                        setShowCreateChapter(true);

                    }}
                    className='flex justify-center absolute left-[50%] bottom-0 translate-x-[-50%]'><FaEdit size={35} 
                    className="bg-white text-sky-900 p-2 rounded-md shadow-md"
                    /></Link>
                  </div>

            </ExamCard>)
                
            }
            </div>)
        }
        


    </div>
  )
}

export default EditChapters
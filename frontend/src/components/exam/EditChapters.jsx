import React, { useEffect } from 'react'
import { BackButton, ExamCard } from '../dashboard/FormComponents'
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Button } from '../dashboard/FormComponents';
import { IoArrowBackCircle } from "react-icons/io5";
import { useState } from 'react';
import EditChapter from '../exam/EditChapter';
import EditCreateChapter from '../dashboard/EditCreateChapter';
import { toast } from 'react-toastify';
import api from '../../configs/axiosConfig';
import Spinner from '../Spinner';



const EditChapters = ({qidUrl,setShowEditChapters}) => {
    const [showEditChapter, setShowEditChapter] = useState(false)
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
          const response = await api.get(`${qidUrl}/chapters`,{headers});
          if (!response.data) {
            throw new Error(`Http error status: ${response.status}`);
          }
          setChapters(response.data)
          setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
          console.log("Error occurred while fetching data ...", error.message);
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
    <div className='w-full min-h-screen' >
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
            
            
            (<div className="max-w-2xl min-h-screen">
            <div className='space-y-4 mb-8'>
                <BackButton
                onClick = {()=>{setShowEditChapters(false)}}
                >
                <IoArrowBackCircle 
                    size={30}
                    className="text-white"/> Back
                </BackButton>
              <h2 className="text-xl font-bold">Edit Exam Chapters</h2>
                </div>

            { Array.isArray(chapters) && chapters.length > 0? 
                
                <div className='flex gap-2 flex-wrap'>
                    {
                    chapters.map((chapter,index) => (


            <ExamCard key={index} className="p-4 relative">
                <div className='mb-4'>
                    <h3 className='text-sm font-medium'>{chapter.name}</h3>
                    <h3 className='text-sm max-sm:text-sm'>No of Questions: {chapter.questions.length}</h3>
                    <h3 className='text-sm max-sm:text-sm'>Allocated time: {chapter.time}</h3>
                    <Link 
                    onClick={()=>{
                        setCurrentChapter(chapter);
                        setCid(chapter._id);
                        setShowEditChapter(true);

                    }}
                    className='flex justify-center absolute left-[50%] bottom-0 translate-x-[-50%]'><FaEdit size={35} 
                    
                    className="bg-white hover:rounded-full transition-all duration-400 ease-in text-sky-900 p-2 rounded-md shadow-md"
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
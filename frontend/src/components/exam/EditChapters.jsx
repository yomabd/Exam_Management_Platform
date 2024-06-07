import React from 'react'
import { ExamCard } from '../dashboard/FormComponents'
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Button } from '../dashboard/FormComponents';
import { IoArrowBackCircle } from "react-icons/io5";
import { useState } from 'react';
import EditChapter from '../exam/EditChapter';



const EditChapters = ({qidUrl, chapters, setShowEditChapters}) => {
    const [showEditChapter, setShowEditChapter] = useState(false)
    const [cid, setCid] = useState('')
    const [currentChapter, setCurrentChapter] = useState({})
    // question bank id url => qidUrl


  return (
    <div lassName="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
        <div className='space-y-4 mb-8'>
                <Button 
                onClick = {()=>{setShowEditChapters(false)}}
                className="w-32 flex text-white bg-black space-x-2">
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
                    <h3 className='text-sm font-medium'>Category: {chapter.time}</h3>
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
                    <h3 className='text-sm font-medium'>No chapter available</h3>
                   
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

            </ExamCard>)
                
            }


    </div>
  )
}

export default EditChapters
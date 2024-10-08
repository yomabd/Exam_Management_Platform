import React, { useState } from "react";
import { FormGroup, FormLabel, Input, Select, Button, BackButton } from "../dashboard/FormComponents";
import api from '../../configs/axiosConfig';
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { fetchQuestionBanks } from "../dashboard/fetchQuestionBankFunction";
import Spinner from "../Spinner";
import { IoArrowBackCircle } from "react-icons/io5";
import EditChapters from "./EditChapters";






const EditExam = ({qid, closeEditExam}) => {
  const [examname, setExamName] = useState('');
  const [examlevel, setExamLevel] = useState('');
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState('');
  const [questionBank, setQuestionBank] = useState({});
  const [chaptersMode, setChaptersMode] = useState('');
  const navigate = useNavigate();
  const [showEditChapters, setShowEditChapters] = useState(false);
  const [chapters, setChapters] =  useState([]);
  const [generalInstruction, setGeneralInstruction] = useState({
    heading: '',
    paragraphs: ['', '', '']
  });
  const url = import.meta.env.VITE_APP_QUESTIONBANK_URL;
  const baseUrl = `${url}/${qid}`;
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  //useEffect for fetching question bank
  useEffect(()=>{
    fetchQuestionBanks(baseUrl, setLoading, setQuestionBank);
   
  },[])

  //useEffect to update the states
  useEffect(() => {
    if (questionBank) {
      setExamName(questionBank.examname || '');
      setExamLevel(questionBank.examlevel || '');
      setTime(questionBank.time || '');
      setChaptersMode(questionBank.chaptersMode || '');
      setGeneralInstruction(questionBank.GeneralInstruction || {
        heading: '',
        paragraphs: ['', '', '']
      });
      setChapters(questionBank.chapters || []);
    }
  }, [questionBank]);
  





  const validateTimeInput = () => {
    if (time < 0) {
      toast.error("Time cannot be negative");
      return false;
    }
    return true;
  };

  const validateForm = () => {
    if (!examname || !examlevel || !time || !chaptersMode) {
      toast.error("Please fill all required fields.");
      return false;
    }
    if (!generalInstruction.paragraphs[0]) {
      toast.error("Please fill the first general instruction paragraph.");
      return false;
    }
    return true;
  };

  const handleEditProceed = (e) => {
    e.preventDefault();
    if (!validateForm() || !validateTimeInput()) return;

    const examData = { 
      examname, 
      examlevel, 
      time, 
      chaptersMode,        
      GeneralInstruction: generalInstruction
    };
    setLoading(true);
    api.put(baseUrl, examData, {headers})
      .then((response) => {
        toast.success("Exam successfully edited.");
        toast.success("Proceeding to edit categories");
        setShowEditChapters(true);
        
      })
      .catch((error) => {
        console.log('Error editing exam...', error.message);
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSaveDashboard = (e) => {
    e.preventDefault();
    if (!validateForm() || !validateTimeInput()) return;

    const examData = { 
      examname, 
      examlevel, 
      time, 
      chaptersMode, 
      GeneralInstruction:generalInstruction 
 
    };
    setLoading(true);
    api.put(baseUrl, examData, {headers})
      .then(() => {
        toast.success("Exam successfully edited.");
        toast.success("navigating to dashboard");
        setTimeout(() => {
          window.location.href = '/admin/dashboard';
        }, 3000);
      })
      .catch((error) => {
        console.log('Error populating exam...');
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleParagraphChange = (index, value) => {
    const newParagraphs = [...generalInstruction.paragraphs];
    newParagraphs[index] = value;
    setGeneralInstruction({ ...generalInstruction, paragraphs: newParagraphs });
  };

  return (
    <>
     
          {loading ? (
            <Spinner/>
          ) : showEditChapters ? (<EditChapters

            qidUrl = {baseUrl}
            chapters = {chapters}
            setChapters={setChapters}
            setShowEditChapters = {setShowEditChapters}

          /> ):
            (
            <div className="max-w-2xl mx-auto p-6">
                <div>
            
                <BackButton
                onClick = {closeEditExam}
                >
                <IoArrowBackCircle 
                    size={30}
                    className="text-white"/> Back
                </BackButton>
              <h2 className="text-xl font-bold mb-4">Edit Exam</h2>
                </div>
              <form>
                <FormGroup>
                  <FormLabel htmlFor="examname" required>
                    Exam Name:
                  </FormLabel>
                  <Input
                    type="text"
                    id="examname"
                    value={examname}
                    onChange={(e) => setExamName(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="examlevel" required>
                    Exam Level:
                  </FormLabel>
                  <Input
                    type="text"
                    id="examlevel"
                    value={examlevel}
                    onChange={(e) => setExamLevel(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="time" required>
                    Time (in minutes):
                  </FormLabel>
                  <Input
                    type="number"
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="chaptersMode" required>
                    Chapters Mode:
                  </FormLabel>
                  <Select
                    id="chaptersMode"
                    value={chaptersMode}
                    onChange={(e) => setChaptersMode(e.target.value)}
                    required
                  >
                    <option value="">Select Chapters Mode</option>
                    <option value="auto">Auto</option>
                    <option value="none">None</option>
                  </Select>
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="generalInstructionHeading">
                    General Instruction Heading:
                  </FormLabel>
                  <Input
                    type="text"
                    id="generalInstructionHeading"
                    value={generalInstruction.heading}
                    onChange={(e) => setGeneralInstruction({ ...generalInstruction, heading: e.target.value })}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="generalInstructionParagraph1" required>
                    General Instruction Paragraph 1:
                  </FormLabel>
                  <Input
                    type="text"
                    id="generalInstructionParagraph1"
                    value={generalInstruction.paragraphs[0]}
                    onChange={(e) => handleParagraphChange(0, e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="generalInstructionParagraph2">
                    General Instruction Paragraph 2:
                  </FormLabel>
                  <Input
                    type="text"
                    id="generalInstructionParagraph2"
                    value={generalInstruction.paragraphs[1]}
                    onChange={(e) => handleParagraphChange(1, e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="generalInstructionParagraph3">
                    General Instruction Paragraph 3:
                  </FormLabel>
                  <Input
                    type="text"
                    id="generalInstructionParagraph3"
                    value={generalInstruction.paragraphs[2]}
                    onChange={(e) => handleParagraphChange(2, e.target.value)}
                  />
                </FormGroup>
                <Button onClick={handleEditProceed} type="button">
                  Proceed to Edit Questions
                </Button>
                <Button onClick={handleSaveDashboard} type="button">
                  Save and Go Back to Dashboard
                </Button>
              </form>
              {/* <ToastContainer /> does not work */}
            </div>
          )}
          <ToastContainer />
   
     
    </>
  );
};

export default EditExam;

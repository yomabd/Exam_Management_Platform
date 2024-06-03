import React, { useState } from 'react';
import { FormGroup, FormLabel, Input, Select, Button } from './FormComponents';
import axios from "axios";

const CreateExamPage = () => {
  const [examName, setExamName] = useState('');
  const [examLevel, setExamLevel] = useState('');
  const [time, setTime] = useState('');
  const [chaptersMode, setChaptersMode] = useState('');
  const [generalInstruction, setGeneralInstruction] = useState({
    heading: '',
    paragraphs: ['', '', '']
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const examData = { 
      examName, 
      examLevel, 
      time, 
      chaptersMode, 
      generalInstruction 
    };
    console.log(examData);
    // Add logic to send data to the backend
  };

  const handleParagraphChange = (index, value) => {
    const newParagraphs = [...generalInstruction.paragraphs];
    // if (newParagraphs[index].trim()!== ""){}
    newParagraphs[index] = value;
    setGeneralInstruction({ ...generalInstruction, paragraphs: newParagraphs });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Create Exam</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel htmlFor="examName" required>
            Exam Name:
          </FormLabel>
          <Input
            type="text"
            id="examName"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="examLevel" required>
            Exam Level:
          </FormLabel>
          <Input
            type="text"
            id="examLevel"
            value={examLevel}
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
          <FormLabel htmlFor="chaptersMode">
            Chapters Mode:
          </FormLabel>
          <Select
            id="chaptersMode"
            value={chaptersMode}
            onChange={(e) => setChaptersMode(e.target.value)}
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
            value={ generalInstruction.paragraphs[2]}
            onChange={(e) => handleParagraphChange(2, e.target.value)}
          />
        </FormGroup>
        <Button type="submit">
          Proceed to Set Questions
        </Button>
        <Button type="submit">
          Save and Go Back to Dashboard
        </Button>
      </form>
    </div>
  );
};

export default CreateExamPage;

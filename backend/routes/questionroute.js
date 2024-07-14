const express = require("express");
const router = express.Router();
const questionController = require("../controller/questioncontroller");
const questionsUrl = process.env.QUESTIONS_URL;

// Routes for handling questions within a specific chapter of a question bank
router.get(`${questionsUrl}`, questionController.getAllQuestions);
router.post(`${questionsUrl}`, questionController.createQuestion);
router.get(`${questionsUrl}/:questionId`, questionController.getQuestionById);
router.put(`${questionsUrl}/:questionId`, questionController.updateQuestion);
router.delete(`${questionsUrl}/:questionId`, questionController.deleteQuestion);

module.exports = router;

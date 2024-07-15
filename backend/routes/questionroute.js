const express = require("express");
const router = express.Router();
const questionController = require("../controller/questioncontroller");
const { authenticateUser } = require("../controller/userController");
const questionsUrl = process.env.QUESTIONS_URL;

// Routes for handling questions within a specific chapter of a question bank
router.get(
  `${questionsUrl}`,
  authenticateUser,
  questionController.getAllQuestions
);
router.post(
  `${questionsUrl}`,
  authenticateUser,
  questionController.createQuestion
);
router.get(
  `${questionsUrl}/:questionId`,
  authenticateUser,
  questionController.getQuestionById
);
router.put(
  `${questionsUrl}/:questionId`,
  authenticateUser,
  questionController.updateQuestion
);
router.delete(
  `${questionsUrl}/:questionId`,
  authenticateUser,
  questionController.deleteQuestion
);

module.exports = router;

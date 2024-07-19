const express = require("express");
const router = express.Router();
const questionController = require("../controller/questioncontroller");
const { authenticateAdmin } = require("../middlewares/auth");
const questionsUrl = process.env.QUESTIONS_URL;

// Routes for handling questions within a specific chapter of a question bank
router.get(
  `${questionsUrl}`,
  authenticateAdmin,
  questionController.getAllQuestions
);
router.post(
  `${questionsUrl}`,
  authenticateAdmin,
  questionController.createQuestion
);
router.get(
  `${questionsUrl}/:questionId`,
  authenticateAdmin,
  questionController.getQuestionById
);
router.put(
  `${questionsUrl}/:questionId`,
  authenticateAdmin,
  questionController.updateQuestion
);
router.delete(
  `${questionsUrl}/:questionId`,
  authenticateAdmin,
  questionController.deleteQuestion
);

module.exports = router;

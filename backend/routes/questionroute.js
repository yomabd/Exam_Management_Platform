const express = require("express");
const router = express.Router();
const questionController = require("../controller/questioncontroller");

// Routes for handling questions within a specific chapter of a question bank
router.get(
  "/:questionBankId/chapters/:chapterId/questions",
  questionController.getAllQuestions
);
router.post(
  "/:questionBankId/chapters/:chapterId/questions",
  questionController.createQuestion
);
router.get(
  "/:questionBankId/chapters/:chapterId/questions/:questionId",
  questionController.getQuestionById
);
router.put(
  "/:questionBankId/chapters/:chapterId/questions/:questionId",
  questionController.updateQuestion
);
router.delete(
  "/:questionBankId/chapters/:chapterId/questions/:questionId",
  questionController.deleteQuestion
);

module.exports = router;

const express = require("express");
const {
  getAllQuestionsForQuestionBank,
  getQuestionByIdForQuestionBank,
  createQuestionForQuestionBank,
  updateQuestionForQuestionBank,
  deleteQuestionForQuestionBank,
} = require("../controller/questioncontroller.js"); // Destructuring import

const router = express.Router();

// Route for fetching all questions in a question bank
router.get(
  "/questionbanks/:questionBankId/questions",
  getAllQuestionsForQuestionBank
);

// Route for fetching a single question by ID within a question bank
router.get(
  "/questionbanks/:questionBankId/questions/:id",
  getQuestionByIdForQuestionBank
);

// Route for creating a new question within a question bank
router.post(
  "/questionbanks/:questionBankId/questions",
  createQuestionForQuestionBank
);

// Route for updating a question by ID within a question bank
router.put(
  "/questionbanks/:questionBankId/questions/:id",
  updateQuestionForQuestionBank
);

// Route for deleting a question by ID within a question bank
router.delete(
  "/questionbanks/:questionBankId/questions/:id",
  deleteQuestionForQuestionBank
);

module.exports = router;

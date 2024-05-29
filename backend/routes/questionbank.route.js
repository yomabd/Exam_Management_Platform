const express = require("express");
const {
  createQuestionBank,
  getQuestionBanks,
  updateQuestionBank,
  deleteQuestionBank,
  getQuestionBankById,
} = require("../controller/questionbank.controller");

const router = express.Router();

// Route for updating a question bank
router.put("/questionbanks/:id", updateQuestionBank);

// Route for deleting a question bank
router.delete("/questionbanks/:id", deleteQuestionBank);

// Route for creating a new question bank
router.post("/questionbanks", createQuestionBank);
//Route for getting all question banks
router.get("/questionbanks", getQuestionBanks);
// Route for fetching a single question bank by ID
router.get("/questionbanks/:id", getQuestionBankById);

module.exports = router;

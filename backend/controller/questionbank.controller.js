// controllers/questionBankController.js

const QuestionBank = require("../models/questionBankModel");

// Controller function for creating a new question bank
exports.createQuestionBank = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(400).json({ message: "User not authenticated" });
    }
    const questionBank = new QuestionBank({ ...req.body, createdBy: userId });
    const savedQuestionBank = await questionBank.save();
    res.status(201).json(savedQuestionBank);
  } catch (error) {
    console.error("Error creating question bank:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function for getting all question banks
exports.getAllQuestionBanks = async (req, res) => {
  try {
    const userId = req.user?._id;
    let query = {};
    if (!userId) {
      return res.status(401).json({ message: "Unathorized! Please log in." });
    } else {
      query = { createdBy: userId };
    }
    const questionBanks = await QuestionBank.find(query);
    res.status(200).json(questionBanks);
  } catch (error) {
    console.error("Error fetching question banks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function for getting a question bank by ID
exports.getQuestionBankById = async (req, res) => {
  try {
    const questionBank = await QuestionBank.findById(req.params.id);
    if (!questionBank) {
      return res.status(404).json({ message: "Question bank not found" });
    }
    res.status(200).json(questionBank);
  } catch (error) {
    console.error("Error fetching question bank by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function for updating a question bank by ID
exports.updateQuestionBank = async (req, res) => {
  try {
    const updatedQuestionBank = await QuestionBank.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedQuestionBank) {
      return res.status(404).json({ message: "Question bank not found" });
    }
    res.status(200).json(updatedQuestionBank);
  } catch (error) {
    console.error("Error updating question bank:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function for deleting a question bank by ID
exports.deleteQuestionBank = async (req, res) => {
  try {
    const deletedQuestionBank = await QuestionBank.findByIdAndDelete(
      req.params.id
    );
    if (!deletedQuestionBank) {
      return res.status(404).json({ message: "Question bank not found" });
    }
    res.status(200).json({ message: "Question bank deleted successfully" });
  } catch (error) {
    console.error("Error deleting question bank:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

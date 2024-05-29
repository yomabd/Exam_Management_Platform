const QuestionBank = require("../models/questionBankModel.js");

// Controller function for creating a new question bank
async function createQuestionBank(req, res) {
  try {
    const { examname, examlevel, questions } = req.body;

    if (!examname || !examlevel) {
      return res
        .status(400)
        .json({ message: "Exam name and exam level are required." });
    }

    const questionBank = new QuestionBank({
      examname,
      examlevel,
      questions,
    });

    const savedQuestionBank = await questionBank.save();

    res.status(201).json(savedQuestionBank);
  } catch (error) {
    console.error("Error creating question bank:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Controller function for handling GET request for question banks
async function getQuestionBanks(req, res) {
  try {
    // Fetch all question banks from the database
    const questionBanks = await QuestionBank.find();
    // const question = await QuestionBank.findById("6657083e9332a8c0ab5c5429");
    // console.log(question);
    res.status(200).json(questionBanks);
  } catch (error) {
    console.error("Error fetching question banks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Controller function for updating a question bank
async function updateQuestionBank(req, res) {
  try {
    const { id } = req.params;
    const { examname, examlevel, questions } = req.body;

    const updatedQuestionBank = await QuestionBank.findByIdAndUpdate(
      id,
      { examname, examlevel, questions },
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
}

// Controller function for deleting a question bank
async function deleteQuestionBank(req, res) {
  try {
    const { id } = req.params;

    const deletedQuestionBank = await QuestionBank.findByIdAndDelete(id);

    if (!deletedQuestionBank) {
      return res.status(404).json({ message: "Question bank not found" });
    }

    res.status(200).json({ message: "Question bank deleted successfully" });
  } catch (error) {
    console.error("Error deleting question bank:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Controller function for fetching a single question bank by ID
async function getQuestionBankById(req, res) {
  try {
    const { id } = req.params;

    const questionBank = await QuestionBank.findById(id);

    if (!questionBank) {
      return res.status(404).json({ message: "Question bank not found" });
    }

    res.status(200).json(questionBank);
  } catch (error) {
    console.error("Error fetching question bank by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  createQuestionBank,
  getQuestionBanks,
  updateQuestionBank,
  deleteQuestionBank,
  getQuestionBankById,
};

const QuestionBank = require("../models/questionBankModel.js"); // Import the QuestionBank model

// Controller function for fetching all questions in a question bank
async function getAllQuestionsForQuestionBank(req, res) {
  try {
    const { questionBankId } = req.params;

    const questionBank = await QuestionBank.findById(questionBankId);
    if (!questionBank) {
      return res.status(404).json({ message: "Question bank not found" });
    }

    res.status(200).json(questionBank.questions);
  } catch (error) {
    console.error("Error fetching questions for question bank:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Controller function for fetching a single question by ID within a question bank
async function getQuestionByIdForQuestionBank(req, res) {
  try {
    const { questionBankId, id } = req.params;

    const questionBank = await QuestionBank.findById(questionBankId);
    if (!questionBank) {
      return res.status(404).json({ message: "Question bank not found" });
    }

    const question = questionBank.questions.id(id);
    if (!question) {
      return res
        .status(404)
        .json({ message: "Question not found in question bank" });
    }

    res.status(200).json(question);
  } catch (error) {
    console.error("Error fetching question by ID for question bank:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Controller function for creating a new question within a question bank
async function createQuestionForQuestionBank(req, res) {
  try {
    const { questionBankId } = req.params;
    const { question, options, correctAnswer } = req.body;

    const questionBank = await QuestionBank.findById(questionBankId);
    if (!questionBank) {
      return res.status(404).json({ message: "Question bank not found" });
    }

    questionBank.questions.push({ question, options, correctAnswer });
    await questionBank.save();

    res.status(201).json(questionBank.questions);
  } catch (error) {
    console.error("Error creating question for question bank:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Controller function for updating a question by ID within a question bank
async function updateQuestionForQuestionBank(req, res) {
  try {
    const { questionBankId, id } = req.params;
    const { question, options, correctAnswer } = req.body;

    const questionBank = await QuestionBank.findById(questionBankId);
    if (!questionBank) {
      return res.status(404).json({ message: "Question bank not found" });
    }

    const questionToUpdate = questionBank.questions.id(id);
    if (!questionToUpdate) {
      return res
        .status(404)
        .json({ message: "Question not found in question bank" });
    }

    questionToUpdate.question = question;
    questionToUpdate.options = options;
    questionToUpdate.correctAnswer = correctAnswer;
    await questionBank.save();

    res.status(200).json(questionToUpdate);
  } catch (error) {
    console.error("Error updating question for question bank:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Controller function for deleting a question by ID within a question bank
async function deleteQuestionForQuestionBank(req, res) {
  try {
    const { questionBankId, id } = req.params;

    const questionBank = await QuestionBank.findById(questionBankId);
    if (!questionBank) {
      return res.status(404).json({ message: "Question bank not found" });
    }

    const questionToDelete = questionBank.questions.id(id);
    if (!questionToDelete) {
      return res
        .status(404)
        .json({ message: "Question not found in question bank" });
    }

    // Using pull() to remove the question from the array
    questionBank.questions.pull(id);
    await questionBank.save();

    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question for question bank:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

module.exports = {
  getAllQuestionsForQuestionBank,
  getQuestionByIdForQuestionBank,
  createQuestionForQuestionBank,
  updateQuestionForQuestionBank,
  deleteQuestionForQuestionBank,
};

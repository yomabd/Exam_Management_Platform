// controllers/questionController.js

const QuestionBank = require("../models/questionBankModel");

// Controller function for getting all questions of a particular chapter in a question bank
exports.getAllQuestions = async (req, res) => {
  try {
    const questionBank = await QuestionBank.findById(req.params.questionBankId);
    if (!questionBank) {
      return res.status(404).json({ message: "Question bank not found" });
    }
    const chapter = questionBank.chapters.id(req.params.chapterId);
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }
    res.status(200).json(chapter.questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function for getting a question by ID from a specific chapter in a question bank
exports.getQuestionById = async (req, res) => {
  try {
    const questionBank = await QuestionBank.findById(req.params.questionBankId);
    if (!questionBank) {
      return res.status(404).json({ message: "Question bank not found" });
    }
    const chapter = questionBank.chapters.id(req.params.chapterId);
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }
    const question = chapter.questions.id(req.params.questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json(question);
  } catch (error) {
    console.error("Error fetching question by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function for creating a new question in a specific chapter of a question bank
exports.createQuestion = async (req, res) => {
  try {
    const questionBank = await QuestionBank.findById(req.params.questionBankId);
    if (!questionBank) {
      return res.status(404).json({ message: "Question bank not found" });
    }
    const chapter = questionBank.chapters.id(req.params.chapterId);
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }
    chapter.questions.push(req.body);
    await questionBank.save();
    res.status(201).json(chapter.questions);
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function for updating a question by ID in a specific chapter of a question bank
exports.updateQuestion = async (req, res) => {
  try {
    const questionBank = await QuestionBank.findById(req.params.questionBankId);
    if (!questionBank) {
      return res.status(404).json({ message: "Question bank not found" });
    }
    const chapter = questionBank.chapters.id(req.params.chapterId);
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }
    const question = chapter.questions.id(req.params.questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    Object.assign(question, req.body);
    await questionBank.save();
    res.status(200).json(question);
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function for deleting a question by ID in a specific chapter of a question bank
exports.deleteQuestion = async (req, res) => {
  try {
    const questionBank = await QuestionBank.findById(req.params.questionBankId);
    if (!questionBank) {
      return res.status(404).json({ message: "Question bank not found" });
    }
    const chapter = questionBank.chapters.id(req.params.chapterId);
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }
    const questionIndex = chapter.questions.findIndex(
      (q) => q._id.toString() === req.params.questionId
    );
    if (questionIndex === -1) {
      return res.status(404).json({ message: "Question not found" });
    }
    chapter.questions.splice(questionIndex, 1);
    await questionBank.save();
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// controllers/chapterController.js

const QuestionBank = require("../models/questionBankModel");

// Controller function for getting all chapters of a particular question bank
exports.getAllChapters = async (req, res) => {
  try {
    const questionBank = await QuestionBank.findById(req.params.questionBankId);
    if (!questionBank) {
      return res.status(404).json({ message: "Question bank not found" });
    }
    res.status(200).json(questionBank.chapters);
  } catch (error) {
    console.error("Error fetching chapters:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function for getting a chapter by ID from a specific question bank
exports.getChapterById = async (req, res) => {
  try {
    const questionBank = await QuestionBank.findById(req.params.questionBankId);
    if (!questionBank) {
      return res.status(404).json({ message: "Question bank not found" });
    }
    const chapter = questionBank.chapters.id(req.params.chapterId);
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }
    res.status(200).json(chapter);
  } catch (error) {
    console.error("Error fetching chapter by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function for creating a new chapter in a specific question bank
exports.createChapter = async (req, res) => {
  try {
    const questionBank = await QuestionBank.findById(req.params.questionBankId);
    if (!questionBank) {
      return res.status(404).json({ message: "Question bank not found" });
    }
    questionBank.chapters.push(req.body);
    await questionBank.save();
    res.status(201).json(questionBank.chapters);
  } catch (error) {
    console.error("Error creating chapter:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function for updating a chapter by ID in a specific question bank
exports.updateChapter = async (req, res) => {
  try {
    const questionBank = await QuestionBank.findById(req.params.questionBankId);
    if (!questionBank) {
      return res.status(404).json({ message: "Question bank not found" });
    }
    const chapter = questionBank.chapters.id(req.params.chapterId);
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }
    Object.assign(chapter, req.body);
    await questionBank.save();
    res.status(200).json(chapter);
  } catch (error) {
    console.error("Error updating chapter:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function for deleting a chapter by ID in a specific question bank
exports.deleteChapter = async (req, res) => {
  try {
    const questionBank = await QuestionBank.findById(req.params.questionBankId);
    if (!questionBank) {
      return res.status(404).json({ message: "Question bank not found" });
    }
    const chapter = questionBank.chapters.id(req.params.chapterId);
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }
    chapter.remove();
    await questionBank.save();
    res.status(200).json({ message: "Chapter deleted successfully" });
  } catch (error) {
    console.error("Error deleting chapter:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

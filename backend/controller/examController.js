const QuestionBank = require("../models/questionBankModel");
const User = require("../models/userModel");

exports.assignExam = async (req, res) => {
  const userId = req.user?._id;
  if (!userId) {
    return res.status(401).json({ message: "Unathorized! Please log in." });
  } else {
    const { candidateId, examId } = req.body;

    if (!candidateId || !examId) {
      return res
        .status(400)
        .json({ message: "Candidate ID and Exam ID are required" });
    }

    try {
      const exam = await QuestionBank.findById(examId);
      if (!exam) {
        return res.status(404).json({ message: "Exam not found" });
      }

      const candidate = await User.findById(candidateId);
      if (!candidate) {
        return res.status(404).json({ message: "Candidate not found" });
      }

      if (!exam.assignedCandidates.includes(candidateId)) {
        exam.assignedCandidates.push(candidateId);
        await exam.save();
      }

      if (!candidate.assignedExams.includes(examId)) {
        candidate.assignedExams.push(examId);
        await candidate.save();
      }

      res.json({ message: "Exam assigned successfully" });
    } catch (error) {
      console.error("Error assigning exam:", error);
      res.status(500).json({ message: "Error assigning exam", error });
    }
  }
};

/// Controller to detach exam from the candidates and vice versa
exports.detachExam = async (req, res) => {
  const userId = req.user?._id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized! Please log in." });
  } else {
    const { candidateId, examId } = req.body;

    if (!candidateId || !examId) {
      return res
        .status(400)
        .json({ message: "Candidate ID and Exam ID are required" });
    }

    try {
      const exam = await QuestionBank.findById(examId);
      if (!exam) {
        return res.status(404).json({ message: "Exam not found" });
      }

      const candidate = await User.findById(candidateId);
      if (!candidate) {
        return res.status(404).json({ message: "Candidate not found" });
      }

      if (exam.assignedCandidates.includes(candidateId)) {
        exam.assignedCandidates = exam.assignedCandidates.filter(
          (id) => id.toString() !== candidateId
        );
        await exam.save();
      }

      if (candidate.assignedExams.includes(examId)) {
        candidate.assignedExams = candidate.assignedExams.filter(
          (id) => id.toString() !== examId
        );
        await candidate.save();
      }

      res.json({ message: "Exam detached successfully" });
    } catch (error) {
      console.error("Error detaching exam:", error);
      res.status(500).json({ message: "Error detaching exam", error });
    }
  }
};

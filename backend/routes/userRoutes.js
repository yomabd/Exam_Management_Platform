const express = require("express");
const { adminLogin, adminRegister } = require("../controller/adminController");
const {
  candidateLogin,
  candidateRegister,
  getAllCandidates,
  getCandidatesWithExam,
  getCandidatesWithoutExam,
  getCandidateExams,
  getCandidateExamById,
} = require("../controller/candidateController");
const {
  authenticateAdmin,
  authenticateCandidate,
} = require("../middlewares/auth");

//create an express router
const router = express.Router();

//maps router to the controllers
router.post("/admin/login", adminLogin);
router.post("/admin/register", adminRegister);
router.post("/candidate/login", candidateLogin);
router.post("/candidate/register", candidateRegister);
router.get("/candidates/", authenticateAdmin, getAllCandidates);
router.get(
  "/candidates/with/:examId",
  authenticateAdmin,
  getCandidatesWithExam
);
router.get(
  "/candidates/without/:examId",
  authenticateAdmin,
  getCandidatesWithoutExam
);
router.get("/candidate/exams", authenticateCandidate, getCandidateExams);
router.get("/candidate/exams/:id", authenticateCandidate, getCandidateExamById);

module.exports = router;

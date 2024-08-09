const express = require("express");
const questionBankController = require("../controller/questionbank.controller");
const {
  authenticateAdmin,
  authenticateCandidate,
} = require("../middlewares/auth");

const router = express.Router();

// Routes for CRUD operations on question banks
router.post("/", authenticateAdmin, questionBankController.createQuestionBank);
router.get("/", authenticateAdmin, questionBankController.getAllQuestionBanks);
router.get(
  "/:id",
  authenticateAdmin || authenticateCandidate,
  questionBankController.getQuestionBankById
);
router.put(
  "/:id",
  authenticateAdmin,
  questionBankController.updateQuestionBank
);
router.delete(
  "/:id",
  authenticateAdmin,
  questionBankController.deleteQuestionBank
);

module.exports = router;

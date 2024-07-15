const express = require("express");
const questionBankController = require("../controller/questionbank.controller");
const { authenticateUser } = require("../controller/userController");

const router = express.Router();

// Routes for CRUD operations on question banks
router.post("/", authenticateUser, questionBankController.createQuestionBank);
router.get("/", authenticateUser, questionBankController.getAllQuestionBanks);
router.get(
  "/:id",
  authenticateUser,
  questionBankController.getQuestionBankById
);
router.put("/:id", authenticateUser, questionBankController.updateQuestionBank);
router.delete(
  "/:id",
  authenticateUser,
  questionBankController.deleteQuestionBank
);

module.exports = router;

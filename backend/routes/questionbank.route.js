const express = require("express");
const questionBankController = require("../controller/questionbank.controller");

const router = express.Router();

// Routes for CRUD operations on question banks
router.post("/", questionBankController.createQuestionBank);
router.get("/", questionBankController.getAllQuestionBanks);
router.get("/:id", questionBankController.getQuestionBankById);
router.put("/:id", questionBankController.updateQuestionBank);
router.delete("/:id", questionBankController.deleteQuestionBank);

module.exports = router;

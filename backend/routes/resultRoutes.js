const express = require("express");
const {
  submitResult,
  retrieveResult,
} = require("../controller/resultController");
const {
  authenticateCandidate,
  authenticateAdmin,
} = require("../middlewares/auth");
const router = express.Router();

//defining the routes
//route to store result
router.post("/submit-result", authenticateCandidate, submitResult);
//route to retrieve result
router.get("/results/:examId", authenticateAdmin, retrieveResult);

module.exports = router;

const express = require("express");
const { assignExam, detachExam } = require("../controller/examController.js");
const { authenticateAdmin } = require("../middlewares/auth");

const router = express.Router();

router.post("/assign-exam", authenticateAdmin, assignExam);
router.delete("/detach-exam", authenticateAdmin, detachExam);

module.exports = router;

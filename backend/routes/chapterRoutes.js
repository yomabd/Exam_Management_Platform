// routes/chapterRoutes.js
const express = require("express");
const router = express.Router();
const chapterController = require("../controller/chapterController");

// Routes for handling chapters within a specific question bank
router.get("/:questionBankId/chapters", chapterController.getAllChapters);
router.post("/:questionBankId/chapters", chapterController.createChapter);
router.get(
  "/:questionBankId/chapters/:chapterId",
  chapterController.getChapterById
);
router.put(
  "/:questionBankId/chapters/:chapterId",
  chapterController.updateChapter
);
router.delete(
  "/:questionBankId/chapters/:chapterId",
  chapterController.deleteChapter
);

module.exports = router;

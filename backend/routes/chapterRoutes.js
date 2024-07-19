// routes/chapterRoutes.js
const express = require("express");
const router = express.Router();
const chapterController = require("../controller/chapterController");
const { authenticateAdmin } = require("../middlewares/auth");
const chaptersUrl = process.env.CHAPTERS_URL;

// Routes for handling chapters within a specific question bank
router.get(
  `/:${chaptersUrl}`,
  authenticateAdmin,
  chapterController.getAllChapters
);
router.post(
  `/:${chaptersUrl}`,
  authenticateAdmin,
  chapterController.createChapter
);
router.get(
  `/:${chaptersUrl}/:chapterId`,
  authenticateAdmin,
  chapterController.getChapterById
);
router.put(
  `/:${chaptersUrl}/:chapterId`,
  authenticateAdmin,
  chapterController.updateChapter
);
router.delete(
  `/:${chaptersUrl}/:chapterId`,
  authenticateAdmin,
  chapterController.deleteChapter
);

module.exports = router;

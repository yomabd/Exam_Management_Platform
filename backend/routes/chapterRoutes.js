// routes/chapterRoutes.js
const express = require("express");
const router = express.Router();
const chapterController = require("../controller/chapterController");
const { authenticateUser } = require("../controller/userController");
const chaptersUrl = process.env.CHAPTERS_URL;

// Routes for handling chapters within a specific question bank
router.get(
  `/:${chaptersUrl}`,
  authenticateUser,
  chapterController.getAllChapters
);
router.post(
  `/:${chaptersUrl}`,
  authenticateUser,
  chapterController.createChapter
);
router.get(
  `/:${chaptersUrl}/:chapterId`,
  authenticateUser,
  chapterController.getChapterById
);
router.put(
  `/:${chaptersUrl}/:chapterId`,
  authenticateUser,
  chapterController.updateChapter
);
router.delete(
  `/:${chaptersUrl}/:chapterId`,
  authenticateUser,
  chapterController.deleteChapter
);

module.exports = router;

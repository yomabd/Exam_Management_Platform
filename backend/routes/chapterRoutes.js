// routes/chapterRoutes.js
const express = require("express");
const router = express.Router();
const chapterController = require("../controller/chapterController");
const chaptersUrl = process.env.CHAPTERS_URL;

// Routes for handling chapters within a specific question bank
router.get(`/:${chaptersUrl}`, chapterController.getAllChapters);
router.post(`/:${chaptersUrl}`, chapterController.createChapter);
router.get(`/:${chaptersUrl}/:chapterId`, chapterController.getChapterById);
router.put(`/:${chaptersUrl}/:chapterId`, chapterController.updateChapter);
router.delete(`/:${chaptersUrl}/:chapterId`, chapterController.deleteChapter);

module.exports = router;

const express = require("express");
const { adminLogin, adminRegister } = require("../controller/adminController");
const {
  candidateLogin,
  candidateRegister,
  getAllCandidates,
} = require("../controller/candidateController");
const { authenticateAdmin } = require("../middlewares/auth");

//create an express router
const router = express.Router();

//maps router to the controllers
router.post("/admin/login", adminLogin);
router.post("/admin/register", adminRegister);
router.post("/candidate/login", candidateLogin);
router.post("/candidate/register", candidateRegister);
router.get("/candidates/", authenticateAdmin, getAllCandidates);

module.exports = router;

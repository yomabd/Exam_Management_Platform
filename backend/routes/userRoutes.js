const express = require("express");
const { adminLogin, adminRegister } = require("../controller/adminController");
const {
  candidateLogin,
  candidateRegister,
} = require("../controller/candidateController");

//create an express router
const router = express.Router();

//maps router to the controllers
router.post("/admin/login", adminLogin);
router.post("/admin/register", adminRegister);
router.post("/candidate/login", candidateLogin);
router.post("/candidate/register", candidateRegister);

module.exports = router;

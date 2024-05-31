const express = require("express");
const { userRegister, userLogin } = require("../controller/userController");

//create an express router
const router = express.Router();

//maps router to the controllers
router.post("/login", userLogin);
router.post("/register", userRegister);

module.exports = router;

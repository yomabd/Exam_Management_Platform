// import necessary modules
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const users = require("../models/userModel");

//make the environment variables available
dotenv.config();

//define register controller
exports.userRegister = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  //define the email regex to check the user email with
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({
      message:
        "Fill all required fields: firstname, lastname, email and password",
    });
  }

  //check for email match
  const emailMatch = emailRegex.test(email);
  if (!emailMatch) {
    return res.status(400).json({ message: "Fill in a valid email address" });
  }

  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(400).json("Email already exists");
    }

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create the user with the hashed password
    const newUser = await users.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    //get the secret json web token
    const secret = process.env.JWT_SECRET;

    //declare payload
    const payload = {
      user: {
        id: newUser._id,
      },
    };

    //define expiration duration
    const expiration = { expiresIn: "1hr" };

    //sign the jwt
    jwt.sign(payload, secret, expiration, (err, token) => {
      //throw the error occurred duration token creation
      if (err) throw err;
      res.json({ token, message: "User created successfully!" });
    });
  } catch (error) {
    //log the error message and send server error over
    console.error("Error Message: ", error.message);
    return res.status(500).send("Server error");
  }
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Fill all required fields: email and password" });
  }
  try {
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //declare the payload
    const payload = {
      user: {
        id: user._id,
      },
    };

    //declare the jwt secret
    const secret = process.env.JWT_SECRET;

    //declare the expiration period
    const expiration = { expiresIn: "1hr" };

    //sign the jwt
    jwt.sign(payload, secret, expiration, (err, token) => {
      if (err) throw err;
      return res.json({ token, message: "Login Successful!" });
    });
  } catch (error) {
    //log the error and repond with server error
    console.error("Error message: ", error.message);
    res.json("Server error");
  }
};

exports.authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unathorized user!" });
  }
  // console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await users.findById(decoded.user.id);
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }
    // console.log(user, "user");
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Failed to authenticate token", error });
  }
};

const express = require("express");
const questionBankRoutes = require("./routes/questionbank.route.js");
const questionRoutes = require("./routes/questionroute.js");
const examRoutes = require("./routes/examRoutes.js");
const resultRoutes = require("./routes/resultRoutes.js");
const connectMongoDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const chapterRoutes = require("./routes/chapterRoutes");

const cors = require("cors");

//initialize express app
const app = express();

// app.use(cors());

//creates a middleware to handle json bodies
app.use(express.json());

// Example CORS configuration in Express.js for development
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*"); // * To be Replaced  with your domain in production
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

//define CORS option
const corsOptions = {
  origin: "https://exam-management-platform-frontend.onrender.com/",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // This allows cookies or other credentials to be sent if needed
};

// Use CORS middleware
app.use(cors(corsOptions));
// app.options("*", cors()); // This will handle all OPTIONS requests for all routes

// // A protected route
// app.get("/protected", authMiddleware, (req, res) => {
//   res.json({ message: "This is a protected route", user: req.user });
// });
//creates a middleware to handle url-encoded submission
app.use(express.urlencoded({ extended: true }));

connectMongoDB();
//initialize PORT

//load environment variable
dotenv.config();
PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
// Mount the question bank routes
app.use(`${process.env.APP_QUESTIONBANK_ROUTE}`, questionBankRoutes);
//Mount the chapter routes
app.use(`${process.env.APP_QUESTIONBANK_ROUTE}`, chapterRoutes);

// Mount the question routes
app.use(`${process.env.APP_QUESTIONBANK_ROUTE}`, questionRoutes);

//Mount the login and register routes
app.use(`${process.env.APP_ROOT_ROUTE}`, userRoutes);

//Mount routes to assign exam
app.use(`${process.env.APP_ROOT_ROUTE}`, examRoutes);

//Mount routes to store and retrieve results
app.use(`${process.env.APP_ROOT_ROUTE}`, resultRoutes);

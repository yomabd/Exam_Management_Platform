const express = require("express");
// const qBank = require("./models/questionBankModel.js");
const questionBankRoutes = require("./routes/questionbank.route.js");
const questionRoutes = require("./routes/questionroute.js");
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
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // * To be Replaced  with your domain in production
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//define CORS option
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Use CORS middleware
app.use(cors(corsOptions));

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
app.use("/api/questionbanks", questionBankRoutes);
//Mount the chapter routes
app.use("/api/questionBanks", chapterRoutes);

// Mount the question routes
app.use("/api/questionBanks", questionRoutes);

//Mount the login and register routes
app.use("/api", userRoutes);

///////////......................//////////////////////////////////

// app.get("/api/exams", async (req, res) => {
//   try {
//     const questions = await qBank.find({});
//     res.status(200).json(questions);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //Default backend route
// app.get("/", (req, res) => {
//   //   res.send("......QUESTIONS BANKS........");
//   //   res.status(200).json("Take a look at it carefully");
//   res.status(200).json({ questionBanks, status: res.statusCode });
//   console.log("This is the middleware");
// });

// //sample data
// const questionBanks = [
//   {
//     name: "Bank 1",
//     questions: [
//       {
//         question: "What is the capital of France?",
//         options: ["Berlin", "Paris", "London", "Rome"],
//         correctAnswer: "Paris",
//       },
//       {
//         question: "What is the largest planet in our solar system?",
//         options: ["Earth", "Saturn", "Jupiter", "Uranus"],
//         correctAnswer: "Jupiter",
//       },
//     ],
//   },

//   {
//     name: "Bank 2",
//     questions: [
//       {
//         question: "What is the capital of Nigeria?",
//         options: ["Lafiagi", "Kano", "Abuja", "Kwar"],
//         correctAnswer: "Abuja",
//       },
//       {
//         question: "What is the smallest unit of life?",
//         options: ["matter", "cell", "organs", "intestines"],
//         correctAnswer: "cell",
//       },
//     ],
//   },

//   {
//     name: "Bank 2",
//     questions: [
//       {
//         question: "What is the capital of France?",
//         options: ["Berlin", "Paris", "London", "Rome"],
//         correctAnswer: "Paris",
//       },
//       {
//         question: "What is the largest planet in our solar system?",
//         options: ["Earth", "Saturn", "Jupiter", "Uranus"],
//         correctAnswer: "Jupiter",
//       },
//     ],
//   },
// ];

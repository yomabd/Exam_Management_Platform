// import mongoose and dotenv
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// import environment variables into process.env
dotenv.config();
//initialize PORT number
PORT = process.env.PORT || 3002;

const connectMongoDB = async () => {
  try {
    console.log("connecting to mongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to Mongo DB at PORT ${PORT}`);
  } catch (error) {
    console.error("Error connecting to mongoDB: ", error.message);
    process.exit(1);
  }
};

// const connectMongoDB = () => {
//   mongoose.connect(process.env.MONGO_URI);
//   db = mongoose.connection;
//   db.on("error", function (error) {
//     console.error("Error connecting to db: ", error.message);
//   });
//   db.once(
//     "open",
//     console.log.bind(console, "Successful Connection to MongoDb")
//   );
// };

module.exports = connectMongoDB;

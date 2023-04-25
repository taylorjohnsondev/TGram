const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const passport = require("passport");
const morgan = require("morgan");

require("./config/passport")(passport);

const app = express();

/* These lines of code are setting up middleware for the Express application: */
app.use(cors());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(express.json());

app.use("/api", require("./routes/index"));

const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@taylorgram.plovuar.mongodb.net/?retryWrites=true&w=majority`;

async function connectDB() {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

connectDB();

app.listen(3001, () => {
  console.log("Server running on port 3001");
});

module.exports = app;

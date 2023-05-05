const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const morgan = require("morgan");
const {
  DB_USERNAME,
  DB_PASSWORD,
  SESSION_SECRET,
} = require("./config/constants");

require("./config/passport")(passport);

const app = express();

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    unset: "keep",
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    },
  })
);

/* These lines of code are setting up middleware for the Express application: */
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Passport.js Middleware
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/api", require("./routes/index"));

app.get("/uploads/:filename", (req, res) => {
  const filename = req.params.filename;
  res.sendFile(path.join(__dirname, "./uploads/", filename));
});

const url = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@taylorgram.plovuar.mongodb.net/?retryWrites=true&w=majority`;

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

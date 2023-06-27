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
  NODE_ENV,
} = require("./config/constants");

require("./config/passport")(passport);

const app = express();

//Passport.js Middleware
app.use(passport.initialize());
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
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;

  next();
});

/* These lines of code are setting up middleware for the Express application: */
app.use(
  cors({
    origin: [
      "https://tgram-social.netlify.app",
      "https://tgram-client.onrender.com",
    ],
  })
);
if (NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use("/api", require("./routes/index"));

app.get("/uploads/:filename", (req, res) => {
  const filename = req.params.filename;
  res.sendFile(path.join(__dirname, "./uploads/", filename));
});

app.get("*", (req, res) => {
  res.send("No routes matched.", 404);
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

if (NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.use(express.static(path.join(__dirname, "./uploads")));
  app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
  );

  app.all("*", (req, res, next) => {
    res.sendFile(
      path.resolve(__dirname, "../client/build/index.html")
    );
  });
}
app.listen(3001, () => {
  console.log("Server running on port 3001");
});

module.exports = app;

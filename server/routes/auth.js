const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.route("/").get((req, res, next) => {
  res.send("auth endpoint");
});

router.post("/register", async (req, res) => {
  const { email, username, password, nickname } = req.body;

  console.log(req.body);

  if (password.length < 7) {
    return res
      .status(400)
      .json({ error: "Password must be atleast 7 characters" });
  }

  if (!password || !username || !email) {
    return res.status(422).json({ error: "All fields not filled" });
  }

  User.findOne({ username: username })
    .then((user) => {
      if (user) {
        return res
          .status(423)
          .json({ error: "Someone is already using that username" });
      }
      bcrypt.hash(password, 12).then((encryptedpass) => {
        const user = new User({
          email,
          username,
          password: encryptedpass,
          nickname,
        });

        const token = jwt.sign(
          {
            username: user.username,
            id: user._id,
          },
          process.env.JWT_SECRET
        );

        user
          .save()
          .then((user) => {
            res.status(200);
            res.send({ token, username, uid: user.id });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(422).json({ error: "All fields not filled" });
  }

  const user = await User.findOne({ username: username });
  const passwordMatch =
    user === null
      ? false
      : await bcrypt.compare(password, user.password);

  if (!(user && passwordMatch)) {
    return res.status(401).json({
      error: "Username or Password incorrect",
    });
  }

  const token = jwt.sign(
    {
      username: user.username,
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  res.status(200);
  res.send({ token, username, uid: user.id });
});

/* This code is defining a route for initiating the Google OAuth authentication process. When a user
navigates to this route, the `passport.authenticate` middleware with the "google" strategy is
triggered, which redirects the user to the Google OAuth consent screen with the requested scopes of
"profile" and "email". If the user grants permission, they will be redirected back to the
application's callback URL with an authorization code that can be exchanged for an access token. */
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

/* This code is defining a route for handling the callback from Google OAuth authentication. When the
user is redirected back to the application after authenticating with Google, this route is
triggered. It uses the `passport.authenticate` middleware with the "google" strategy to verify the
user's identity. If the authentication is successful, the `req.user` object will contain information
about the authenticated user. The route then redirects the user to the homepage of the application
at "http://localhost:3000". */
router.get(
  "/google/callback",
  passport.authenticate("google", {
    passReqToCallback: true,
    session: false,
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("http://localhost:3000");
  }
);

module.exports = router;

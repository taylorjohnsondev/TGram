const express = require("express");
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

module.exports = router;

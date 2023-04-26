const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(404);
  }
});

router.get("/:_id", async (req, res) => {
  try {
    User.findById(req.params._id)
      .select("-password")
      .then((user) => {
        return res.status(200).json(user);
      });
  } catch (err) {
    console.log(err);
    res.status(404);
  }
});

module.exports = router;

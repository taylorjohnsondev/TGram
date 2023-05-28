const express = require("express");
const router = express.Router();
const User = require("../models/user");
const ensureAuth = require("../middleware/ensureAuth");
const verifyJWT = require("../middleware/verifyJWT");
const bcrypt = require("bcrypt");
const fileupload = require("../middleware/fileUpload");

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
      .populate("followers", "username nickname picture googlePicture") //return new followers.
      .then((user) => {
        return res.status(200).json(user);
      });
  } catch (err) {
    console.log(err);
    res.status(404);
  }
});

/* This code block defines a PUT route for following a user. It takes in the user ID of the user being
followed as a parameter in the URL, and verifies the JWT token using the `verifyJWT` middleware. */
router.put("/follow/:_id", verifyJWT, async (req, res, next) => {
  const { _id } = req.params; // The user who is being followed.
  const follower = req.id; // The user who wants to follow.

  if (follower === _id) {
    return res
      .status(400)
      .json({ error: "You can't follow your own account." });
  }

  try {
    const userBeingFollowed = await User.findById(_id);
    const userDoingFollowing = await User.findById(follower);

    // Check if the user is already being followed
    if (userBeingFollowed.followers.includes(follower)) {
      return res
        .status(400)
        .json({ error: "You are already following this user." });
    } else {
      // Update the user who is being followed
      userBeingFollowed.followers.push(follower);
      await userBeingFollowed.save();

      // Update the user who is doing the following
      userDoingFollowing.following.push(_id);
      await userDoingFollowing.save();

      res.status(200).json({ userBeingFollowed });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.put("/:_id/edit", verifyJWT, async (req, res) => {
  const { username, password } = req.body;

  const encryptedpass = await bcrypt.hash(password, 12);

  if (!password) {
    return res.status(422).json({ error: "Please enter a new password" });
  }

  if (password.length < 7) {
    return res
      .status(423)
      .json({ error: "Password must be atleast 7 characters" });
  }

  try {
    const updateUser = await User.updateOne(
      { _id: req.params._id },
      { $set: { username: username, password: encryptedpass } }
    );

    res.json(updateUser);
  } catch (error) {
    console.log(error);
  }
});

router.post(
  "/avatar/:_id",
  fileupload.single("file"),
  async (req, res, next) => {
    const { _id } = req.params; //user id

    const userToUpdate = await User.findById({ _id: _id }); //find user by their id

    if (!userToUpdate) {
      return res.status(401).json({ error: "User not found." });
    }

    if (!req.file) {
      return res.status(422).json({ error: "Post picture required." });
    }

    try {
      const updateAvatar = await User.findByIdAndUpdate(_id, {
        picture: req.file && req.file.path,
      });

      return res.status(201).json(updateAvatar);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;

const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user");
const fileupload = require("../middleware/fileUpload");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username picture");
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

router.get("/:_id", async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params._id }).populate(
      "author"
    );
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
});

router.post("/:_id", fileupload.single("file"), async (req, res, next) => {
  try {
    const { text } = req.body;
    const author = req.params._id;
    const file = "/uploads/" + req.file.filename;

    const post = await Post.create({ file, text, author });

    const user = await User.findByIdAndUpdate(
      author,
      { $push: { posts: post } },
      { new: true }
    );

    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user");
const fileupload = require("../middleware/fileUpload");

const populateQuery = [
  { path: "author", select: ["username", "picture"] },
  {
    path: "comments",
    populate: {
      path: "author",
      select: ["username", "picture", "googlePicture", "created"],
    },
  },
  {
    path: "likes",
    populate: "username",
    select: ["picture", "googlePicture"],
  },
];

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate(populateQuery)
      .sort({ time: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

router.get("/:_id", async (req, res) => {
  try {
    const posts = await Post.find({
      author: req.params._id,
    }).populate(populateQuery);
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
});

router.post(
  "/:_id",
  fileupload.single("file"),
  async (req, res, next) => {
    if (!req.file) {
      return res
        .status(422)
        .json({ error: "Post picture required." });
    }

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
  }
);

/* This code block is defining a PUT route for liking a post. It takes in the post ID as a parameter in
the URL and the user ID in the request body. It then uses `Post.findByIdAndUpdate()` to find the
post by ID and update its `likes` array by adding the user ID to it using ``. The `{ new:
true }` option is used to return the updated post after the update operation. The `populate()`
method is used to populate the `likes` field with the user objects. Finally, the updated post is
sent as a response with a status code of 200. If there is an error, it logs the error and sends a
status code of 500. */
router.put("/like/:post_id", async (req, res) => {
  const { post_id } = req.params;
  const { user_id } = req.body;

  const checkForLike = await Post.findOne({ _id: post_id });

  try {
    //if the user has already liked the post, let's send back a response and return.
    if (checkForLike.likes.includes(user_id)) {
      return res
        .status(400)
        .json({ error: "You have already liked this post." });
    }
    await Post.findByIdAndUpdate(
      post_id,
      {
        $addToSet: {
          likes: user_id,
        } /*$/* `addToSet` is a MongoDB operator used in the `update`
        parameter of `findByIdAndUpdate()` method. It adds a value
        to an array field only if the value is not already present
        in the array. In the context of this code block, it is
        used to add the `user_id` to the `likes` array of a post
        only if the `user_id` is not already present in the array. */,
      },
      { new: true }
    )
      .populate("likes", "-_id email username")
      .then((updatedPost) => {
        res.status(200).json({ updatedPost });
      })
      .catch((err) => {
        return res
          .status(500)
          .json({ error: "something went wrong." });
      });
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

/**
 *@method:POST
 *@requires:post id
 *@route: http://localhost:3001/api/posts/comment/:_id
 
*/
router.put(
  "/comment/:_id",

  async (req, res, next) => {
    const { _id } = req.params;
    const { text, user_id } = req.body;
    console.log(_id);

    const comment = {
      text: text,
      author: user_id,
    };
    try {
      await Post.findByIdAndUpdate(
        _id,
        {
          $push: {
            comments: comment,
          },
        },
        { new: true }
      )
        .populate({
          path: "comments.author",
          select: ["username", "picture", "googlePicture"],
        })
        .then((updatedPost) => {
          res.status(200).json({ updatedPost });
        })
        .catch((err) => {
          return res.status(500).json({ error: err });
        });
    } catch (err) {
      console.error(err);
      res.status(500);
    }
  }
);

module.exports = router;

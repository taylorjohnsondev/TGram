const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
  file: {
    type: String,
    default: "/test.png",
  },
  text: {
    type: String,
    required: true,
  },
  author: {
    type: ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Post", postSchema);

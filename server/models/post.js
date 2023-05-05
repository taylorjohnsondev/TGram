const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
  file: {
    type: String,
    required: true,
  }, 
  text: {
    type: String,
    required: true,
  },
  author: {
    type: ObjectId,
    ref: "User",
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);

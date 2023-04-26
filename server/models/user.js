const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    default: "",
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  picture: { type: String, default: "/defaultpicture.png" },
  googleId: {
    type: String,
  },
  googlePicture: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);

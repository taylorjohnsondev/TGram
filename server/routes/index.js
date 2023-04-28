const express = require("express");
const authRouter = require("./auth");
const userRouter = require("./users");
const postRouter = require("./posts") 
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).send("api endpoint");
});

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/posts", postRouter); 

module.exports = router;

const express = require("express");
const router = express.Router();
const authRouter = require("./auth");

router.get("/api", (req, res, next) => {
  res.status(200).send("api endpoint");
});

router.use("/auth", authRouter);

module.exports = router;

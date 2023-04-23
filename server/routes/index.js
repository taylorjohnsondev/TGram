const express = require("express");
const router = express.Router(); 

router.get("/api", (req, res, next) => {
  res.status(200).send("api endpoint");
});

module.exports = router;
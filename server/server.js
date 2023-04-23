const express = require("express");
const app = express()


app.use("/api", require("./routes/index"));

app.listen(3001, () => {
  console.log("Server running on port 3001");
});

module.exports = app;
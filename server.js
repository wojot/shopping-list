const express = require("express");
const app = express();
var cors = require("cors");
const path = require("path");
const config = require("./config/default.json");
app.use(express.json());

var mongoose = require("mongoose");

const dbURL = config.mongoURI;
mongoCFG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
};

mongoose
  .connect(dbURL, mongoCFG)
  .then(() => {
    console.log("Connected to Mongo database!");
  })
  .catch(err => {
    console.error("App starting error:", err.stack);
  });

app.use(cors());
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

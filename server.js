const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
var cors = require("cors");
const path = require("path");

var mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://wojot:wojtek11@fullstack-app-2mpeu.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Database connected");
});

app.use(express.json());
app.use(cors());
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users")); 

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// create an express server
// connect to the database using mongoose
// start the server on a port
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Book = require("./models/books");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks", {
  useNewUrlParser: true,
  useCreateIndex: true
});

const app = express();

app.use(express.json({ extended: false }));
app.use(express.static("client/build"));

app.get("/api/books", (req, res) => {
  Book.find({}).then(dbBooks => {
    res.json(dbBooks);
  });
});

app.post("/api/books", (req, res) => {
  Book.create(req.body).then(dbBooks => {
    res.json(dbBooks);
  });
});

app.delete("/api/books/:id", (req, res) => {
  console.log(req.params);
  Book.remove({ _id: req.params.id }).then(dbBooks => {
    res.json(dbBooks);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));

const mongoose = require("mongoose");

const BooksSchema = new mongoose.Schema({
  title: {
    type: String
  },
  authors: {
    type: [String]
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  link: {
    type: String
  }
});

module.exports = mongoose.model("book", BooksSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: String,
  description: String,
  img: String,
  eTag: String,
  averageRating: String,
  infoLink: String,
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;

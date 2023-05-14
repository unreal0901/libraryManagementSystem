const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A book must have a title"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "A book must have an author"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    isbn: {
      type: String,
      trim: true,
    },
    publishedDate: {
      type: Date,
    },
    publisher: {
      type: String,
      trim: true,
    },
    pageCount: {
      type: Number,
    },
    language: {
      type: String,
      trim: true,
    },
    numBooksAvailable: {
      type: Number,
      required: [true, "A book must have the number of books available"],
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
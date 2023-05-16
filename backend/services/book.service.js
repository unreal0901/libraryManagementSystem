const Book = require("../models/book.model");
const BookInventory = require("../models/bookInventory.model");

const createBook = async (input, numBooks) => {
  await BookInventory.create({
    isbn: input.isbn,
    numBooksAvailable: numBooks,
  });
  return Book.create(input);
};

const findBook = async (query, options = {}) => {
  return await Book.findOne(query, {}, options);
};

const getAllBooks = async () => {
  return await Book.find();
};

module.exports = { getAllBooks, createBook, findBook };

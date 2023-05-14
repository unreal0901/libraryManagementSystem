const Book = require("../models/book.model");

const createBook = async (input) => {
  console.log(input);
  return Book.create(input);
};

const findBook = async (query, options = {}) => {
  return await Book.findOne(query, {}, options);
};

const getAllBooks = async () => {
  return await Book.find();
};

module.exports = { getAllBooks, createBook };

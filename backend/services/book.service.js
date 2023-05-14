const Book = require("../models/book.model");

const createBook = async (input) => {
  return Book.create(input);
};

const findBook = async (query, options = {}) => {
  return await Book.findOne(query, {}, options);
};

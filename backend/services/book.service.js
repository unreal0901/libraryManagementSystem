const Book = require("../models/book.model");
const BookInventory = require("../models/bookInventory.model");

const createBook = async (input, numBooks) => {
  let inventory = await BookInventory.findOne({
    where: { isbn: input.isbn },
  });

  if (inventory) {
    inventory.numBooksAvailable += numBooks;
    await inventory.save();
  } else {
    await BookInventory.create({
      isbn: input.isbn,
      numBooksAvailable: numBooks,
      
    });
  }
  return Book.create(input);
};

const findBook = async (query, options = {}) => {
  return await Book.findOne(query, {}, options);
};

const getAllBooks = async () => {
  return await Book.find();
};

module.exports = { getAllBooks, createBook, findBook };

const Book = require("../models/book.model");
const Student = require("../models/student.model");
const BookInventory = require("../models/bookInventory.model");

const findBook = async (query, options = {}) => {
  return await Book.findOne(query, options);
};

const issueBook = async (user, bookToIssue) => {
  const student = await Student.findById(user._id);
  console.log(student);
  const newIssuedBook = { book: bookToIssue.id };
  student.issuedBooks.push(newIssuedBook);
  await student.save();
  const bookInventory = await BookInventory.findOne({ isbn: bookToIssue.isbn });
  if (bookInventory) {
    bookInventory.numBooksAvailable -= 1;
    bookInventory.users.push(student.email);
    await bookInventory.save();
  }
  await bookToIssue.save();
};

module.exports = { findBook, issueBook };

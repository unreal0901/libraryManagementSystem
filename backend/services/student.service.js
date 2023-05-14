const Book = require("../models/book.model");
const Student = require("../models/student.model");

const findBook = async (query, options = {}) => {
  return await Book.findOne(query, options);
};

const issueBook = async (user, bookToIssue) => {
  const student = await Student.findById(user._id);
  console.log(student);
  const newIssuedBook = { book: bookToIssue.id };
  student.issuedBooks.push(newIssuedBook);
  await student.save();
  bookToIssue.numBooksAvailable -= 1;
  await bookToIssue.save();
};

module.exports = { findBook, issueBook };

const Book = require("../models/book.model");
const Student = require("../models/student.model");
const BookInventory = require("../models/bookInventory.model");

const findBook = async (query, options = {}) => {
  return await Book.findOne(query, options);
};

const issueBook = async (user, bookToIssue) => {
  const student = await Student.findById(user._id);
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

const returnBook = async (user, bookId, next) => {
  const student = await Student.findById(user._id);
  const issuedBookIndex = student.issuedBooks.findIndex(
    (issuedBook) => issuedBook.book.toString() === bookId
  );

  if (issuedBookIndex !== -1) {
    student.issuedBooks.splice(issuedBookIndex, 1);
    await student.save();
  } else return -1;

  const bookToReturn = await findBook({ _id: bookId });
  const bookInventory = await BookInventory.findOne({
    isbn: bookToReturn.isbn,
  });

  if (bookInventory) {
    bookInventory.numBooksAvailable += 1;
    bookInventory.users.pull(user.email);
    await bookInventory.save();
  }
};

module.exports = { findBook, issueBook, returnBook };

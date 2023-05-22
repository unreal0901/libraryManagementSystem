const Book = require("../models/book.model");
const Student = require("../models/student.model");
const BookInventory = require("../models/bookInventory.model");
const AppError = require("../utils/appError");
const mongoose = require("mongoose");

const findBook = async (query, options = {}) => {
  return await Book.findOne(query, options);
};

// const issueBook = async (user, bookToIssue) => {
//   const student = await Student.findById(user._id);
//   console.log(student);
//   const newIssuedBook = { book: bookToIssue.id };
//   student.issuedBooks.push(newIssuedBook);
//   await student.save();
//   const bookInventory = await BookInventory.findOne({ isbn: bookToIssue.isbn });
//   console.log(bookInventory);
//   if (bookInventory) {
//     bookInventory.numBooksAvailable -= 1;
//     bookInventory.users.push(student.email);
//     await bookInventory.save();
//   }
//   await bookToIssue.save();
// };

const issueBook = async (user, bookToIssue) => {
  try {
    const student = await Student.findById(user._id);
    if (!student) {
      throw new AppError("Student not found", 404);
    }

    console.log(student);
    const newIssuedBook = { book: bookToIssue.id };

    const isBookAlreadyIssued = student.issuedBooks.some((issuedBook) => {
      return issuedBook.book.toString() === bookToIssue._id.toString();
    });
    if (isBookAlreadyIssued) {
      throw new AppError("You have already issued the book", 400);
    }

    student.issuedBooks.push(newIssuedBook);
    await student.save();

    const bookInventory = await BookInventory.findOne({
      isbn: bookToIssue.isbn,
    });
    console.log(bookInventory);
    if (bookInventory) {
      bookInventory.numBooksAvailable -= 1;

      const userExists = bookInventory.users.some(
        (userObj) => userObj && userObj.toString() === student._id.toString()
      );
      if (!userExists) {
        bookInventory.users.push(student._id);
      }

      await bookInventory.save();
    }

    await bookToIssue.save();
  } catch (error) {
    throw error;
  }
};

// const returnBook = async (user, bookId, next) => {
//   const student = await Student.findById(user._id);
//   const issuedBookIndex = student.issuedBooks.findIndex(
//     (issuedBook) => issuedBook.book.toString() === bookId
//   );

//   if (issuedBookIndex === -1) return -1;

//   const issuedBook = student.issuedBooks[issuedBookIndex];

//   const bookToReturn = await findBook({ _id: bookId });
//   const bookInventory = await BookInventory.findOne({
//     isbn: bookToReturn.isbn,
//   });

//   if (bookInventory) {
//     bookInventory.numBooksAvailable += 1;
//     bookInventory.users.pull(user.email);
//     await bookInventory.save();
//   }

//   const fineRatePerDaY = 1;
//   const bookFine = student.calculateFineAmount(issuedBookIndex, fineRatePerDaY);

//   // Update totalFine field
//   student.totalFine += bookFine;

//   // Generate return date
//   const returnDate = new Date();

//   // Add book to booksUsed array with generated return date
//   student.booksUsed.push({
//     book: issuedBook.book,
//     issuedDate: issuedBook.issuedDate,
//     returnDate: returnDate,
//     fineAmount: bookFine,
//   });

//   // Remove the  book from issuedBooks array
//   student.issuedBooks.splice(issuedBookIndex, 1);
//   await student.save();
//   return student.totalFine;
// };

const returnBook = async (user, bookId, next) => {
  const student = await Student.findById(user._id);
  const issuedBookIndex = student.issuedBooks.findIndex(
    (issuedBook) => issuedBook.book.toString() === bookId
  );

  if (issuedBookIndex === -1) return -1;

  const issuedBook = student.issuedBooks[issuedBookIndex];

  const bookToReturn = await findBook({ _id: bookId });
  const bookInventory = await BookInventory.findOne({
    isbn: bookToReturn.isbn,
  });

  if (bookInventory) {
    bookInventory.numBooksAvailable += 1;
    bookInventory.users = bookInventory.users.filter(
      (userId) => userId.toString() !== user._id
    ); // Remove user from the users array
    await bookInventory.save();
  }

  const fineRatePerDay = 1;
  const bookFine = student.calculateFineAmount(issuedBookIndex, fineRatePerDay);

  // Update totalFine field
  student.totalFine += bookFine;

  // Generate return date
  const returnDate = new Date();

  // Add book to booksUsed array with generated return date
  student.booksUsed.push({
    book: issuedBook.book,
    issuedDate: issuedBook.issuedDate,
    returnDate: returnDate,
    fineAmount: bookFine,
  });

  // Remove the book from issuedBooks array
  student.issuedBooks.splice(issuedBookIndex, 1);
  await student.save();
  return student.totalFine;
};

const getStudentBooks = async (user) => {
  try {
    // Find the user by _id and populate all fields in the issuedBooks and booksUsed arrays
    const populatedUser = await Student.findById(user._id)
      .populate({
        path: "issuedBooks.book",
      })
      .populate({
        path: "booksUsed.book",
      })
      .exec();

    // Extract the issuedBooks and booksUsed arrays from the populatedUser object
    const { issuedBooks, booksUsed } = populatedUser;
    const data = { issuedBooks, booksUsed };
    // Return an object containing the arrays
    return data;
  } catch (error) {
    console.error("Error retrieving student books:", error);
    throw error;
  }
};

module.exports = { findBook, issueBook, returnBook, getStudentBooks };

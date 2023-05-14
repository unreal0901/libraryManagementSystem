const AppError = require("../utils/appError");

const { findBook, issueBook } = require("../services/student.service");

module.exports.issueHandler = async (req, res, next) => {
  try {
    const bookId = req.params.bookId;
    const user = res.locals.user;
    const book = await findBook({ _id: bookId });

    if (book.numBooksAvailable === 0) {
      return res.status(404).json({ message: "No available books to issue." });
    }

    await issueBook(user, book);
    res.status(201).json({
      message: `Book ${book.title} issued by ${user.fullName}`,
    });
  } catch (error) {
    next(error);
  }
};

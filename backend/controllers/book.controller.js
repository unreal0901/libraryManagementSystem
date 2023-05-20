const AppError = require("../utils/appError");
const {
  getAllBooks,
  createBook,
  updateBook,
} = require("../services/book.service");

module.exports.createBookHandler = async (req, res, next) => {
  try {
    // console.log("inside controller");
    const book = await createBook(
      {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        image: req.body.image,
        isbn: req.body.isbn,
        publishedDate: new Date(req.body.publishedDate),
        publisher: req.body.publisher,
        pageCount: req.body.pageCount,
        language: req.body.language,
      },
      req.body.numBooksAvailable
    );
    book.save();

    res.status(201).json({
      message: "Book Created",
      data: book,
    });
  } catch (err) {
    if (err.code === 11000) {
      console.log(err);
      return res.status(409).json({
        status: "fail",
        message: "Book already exist, try to edit it.",
      });
    }
    next(err);
  }
};

module.exports.getAllBookHandler = async (req, res, next) => {
  try {
    const books = await getAllBooks();
    res.status(200).json({ message: "All books fetched", data: books });
  } catch (error) {
    console.log(error);
    next(new AppError(error));
  }
};

module.exports.updateBookHandler = async (req, res, next) => {
  try {
    const { isbn } = req.body;
    const payload = req.body;

    const updatedData = await updateBook(isbn, payload);

    res.status(200).json({
      message: "Book updated",
      data: updatedData,
    });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(409).json({
        status: "fail",
        message: "Book already exists, try editing it.",
      });
    }
    next(err);
  }
};

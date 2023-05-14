const AppError = require("../utils/appError");
const { getAllBooks, createBook } = require("../services/book.service");

module.exports.createBookHandler = async (req, res, next) => {
  try {
    console.log("inside controller");
    const book = await createBook({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      image: req.body.image,
      isbn: req.body.isbn,
      publishedDate: new Date(req.body.publishedDate),
      publisher: req.body.publisher,
      pageCount: req.body.pageCount,
      language: req.body.language,
      numBooksAvailable: req.body.numBooksAvailable,
    });
    book.save();

    res.status(201).json({
      message: "Book Created",
      data: book,
    });
  } catch (error) {
    console.log(error);
    next(new AppError(error));
  }
};

module.exports.getAllBookHandler = async (req, res, next) => {
  try {
    const books = getAllBooks();
    res.status(200).json({ message: "All books fetched", data: books });
  } catch (error) {
    console.log(error);
    next(new AppError(error));
  }
};

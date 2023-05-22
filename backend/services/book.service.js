const Book = require("../models/book.model");
const BookInventory = require("../models/bookInventory.model");

const createBook = async (input, numBooks) => {
  try {
    let inventory = await BookInventory.findOne({ isbn: input.isbn });

    if (inventory) {
      inventory.numBooksAvailable += numBooks;
      await inventory.save();
    } else {
      inventory = new BookInventory({
        isbn: input.isbn,
        numBooksAvailable: numBooks,
      });
      await inventory.save();
    }

    return Book.create(input);
  } catch (error) {
    // Handle the error here
    console.error(error, "Error occured during create Book");
    throw error;
  }
};

const findBook = async (query, options = {}) => {
  return await Book.findOne(query, {}, options);
};

const getAllBooks = async () => {
  const books = await Book.find();
  const bookInventoryMap = {};

  // Fetch numBooksAvailable for each book from BookInventory
  const bookInventoryList = await BookInventory.find({
    isbn: { $in: books.map((book) => book.isbn) },
  });
  bookInventoryList.forEach((inventory) => {
    bookInventoryMap[inventory.isbn] = inventory.numBooksAvailable;
  });

  // Add numBooksAvailable property to each book
  const booksWithInventory = books.map((book) => ({
    ...book.toObject(),
    numBooksAvailable: bookInventoryMap[book.isbn] || 0,
  }));

  return booksWithInventory;
};

const updateBook = async (isbn, payload) => {
  try {
    const bookDataToUpdate = {};

    // Filter out the empty strings and update only the defined fields
    for (const key in payload) {
      if (payload.hasOwnProperty(key) && payload[key] !== "") {
        // if (key === "publishedDate") {
        //   // Format the publishedDate field if it exists
        //   bookDataToUpdate[key] = payload[key]
        //     ? format(new Date(payload[key]), "yyyy-MM-dd")
        //     : format(new Date(), "yyyy-MM-dd");
        // } else {
        bookDataToUpdate[key] = payload[key];
        // }
      }
    }

    // Update the Book model based on the ISBN
    const updatedBook = await Book.findOneAndUpdate(
      { isbn },
      { $set: bookDataToUpdate },
      { new: true }
    );

    // Find the BookInventory entry based on the ISBN
    const inventory = await BookInventory.findOne({ isbn });

    // Update the BookInventory entry if it exists
    if (inventory) {
      if (payload.numBooksAvailable) {
        inventory.numBooksAvailable = payload.numBooksAvailable;
      }
      await inventory.save();
    }

    return { book: updatedBook, inventory };
  } catch (error) {
    console.log(error);
    // Handle the error appropriately
    throw new Error("Failed to update book and inventory");
  }
};

module.exports = { getAllBooks, createBook, findBook, updateBook };

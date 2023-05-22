const mongoose = require("mongoose");

const bookInventorySchema = new mongoose.Schema(
  {
    isbn: {
      type: String,
      unique: true,
      required: [true, "An ISBN must be provided"],
      trim: true,
    },
    numBooksAvailable: {
      type: Number,
      required: [true, "The number of books available must be provided"],
      min: 0,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const BookInventory = mongoose.model("BookInventory", bookInventorySchema);

module.exports = BookInventory;

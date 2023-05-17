const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const generator = require("generate-password");
const Book = require("./book.model");
const studentSchema = new mongoose.Schema(
  {
    fullName: { type: String },
    email: { type: String, unique: true, required: true },
    role: { type: String, default: "user" },
    photo: { type: String, default: "default.png" },
    password: { type: String },
    issuedBooks: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
          required: true,
        },
        issuedDate: { type: Date, default: Date.now },
        returnDate: {
          type: Date,
          default: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000), //16 days ahead of the issued date by default
        },
      },
    ],
    totalFine: { type: Number, default: 0 },
    booksUsed: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
          required: true,
        },
        issuedDate: { type: Date, required: true },
        returnDate: { type: Date, required: true },
        fineAmount: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

//Automatically run and hash the password
studentSchema.pre("save", async function (next) {
  this.id = this._id;

  // Hash password if the password is new or was updated
  if (!this.isModified("password")) return;

  // Hash password with costFactor of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

studentSchema.methods.comparePasswords = async function (
  hashedPassword,
  candidatePassword
) {
  return await bcrypt.compare(candidatePassword, hashedPassword);
};

studentSchema.methods.createPassword = function () {
  const passwordVal = generator.generate({
    length: 10,
    numbers: true,
    symbols: true,
  });
  this.password = passwordVal;

  return passwordVal;
};

// Method to calculate fine based on the index of issuedBook and fineRate
studentSchema.methods.calculateFineAmount = function (
  bookIndex,
  fineRatePerDay
) {
  const issuedBook = this.issuedBooks[bookIndex];
  const currentDate = new Date().setHours(0, 0, 0, 0); // Set current date to midnight
  const returnDate = new Date(issuedBook.returnDate).setHours(0, 0, 0, 0); // Set return date to midnight
  const dayDifference = Math.ceil(
    (currentDate - returnDate) / (24 * 60 * 60 * 1000)
  );

  if (dayDifference <= 0) {
    return 0; // Book returned on or before the specified return date
  }

  const bookFine = dayDifference * fineRatePerDay;
  return bookFine;
};

const studentModel = mongoose.model("Student", studentSchema);

module.exports = studentModel;

// register -> create -> email -> pre middleware -> hash -> database

// login -> user(password),database(passoword)->compare->true/false;

// login -> accesstoken,refreshtoken, loginIn

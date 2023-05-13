const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const generator = require("generate-password");

const studentSchema = new mongoose.Schema(
  {
    fullName: { type: String },
    email: { type: String, unique: true, required: true },
    role: { type: String, default: "user" },
    photo: { type: String, default: "default.png" },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);

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

const studentModel = mongoose.model("Student", studentSchema);

module.exports = studentModel;
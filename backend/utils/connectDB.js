const mongoose = require("mongoose");
const config = require("config");

const dbUrl = `mongodb://${config.get("dbName")}:${config.get(
  "dbPass"
)}@localhost:6000/${config.get("databaseName")}?authSource=admin`;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Database connected...");
  } catch (error) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

module.exports = connectDB;

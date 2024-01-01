const mongoose = require("mongoose");
const config = require("config");

// mongodb+srv://<username>:<password>@cluster0.ssslp.mongodb.net/?retryWrites=true&w=majority

const dbUrl = `mongodb+srv://${config.get("dbName")}:${config.get(
  "dbPass"
)}@cluster0.ssslp.mongodb.net/${config.get(
  "databaseName"
)}?retryWrites=true&w=majority`;

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

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const config = require("config");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./utils/connectDB");
const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");
const bookRouter = require("./routes/book.route");
const studentRouter = require("./routes/student.route");
const app = express();

// middleware

// 1. Body parser
app.use(express.json({ limit: "10kb" }));

// 2. Cookie parser
app.use(cookieParser());

// 3.Cors
app.use(cors({ origin: config.get("origin"), credentials: true }));

//4. logger
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// 5. Routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/book", bookRouter);
app.use("/api/student", studentRouter);

// Testing
app.get("/api/healthChecker", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Library management system is working Fine",
  });
});

// unknown routes
app.all("*", (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`);
  err.statusCode = 404;
  next(err);
});

// Global error handler middleware
// Global Error Handler
app.use((err, req, res, next) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

const port = config.get("port");
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
  // 👇 call the connectDB function here
  connectDB();
});

module.exports = app;

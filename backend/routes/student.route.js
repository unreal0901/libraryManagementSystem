const express = require("express");
const { deserializeUser } = require("../middleware/deserializeUser");
const { requireUser } = require("../middleware/requireUser");

const {
  issueHandler,
  returnHandler,
  getStudentBooksHandler,
} = require("../controllers/student.controller");

const router = express.Router();

// This is deserialze middleware it checks for user have valid session and have appropriate tokens.
router.use(deserializeUser, requireUser);

router.post("/issue/:bookId", issueHandler);
router.post("/return/:bookId", returnHandler);
router.get("/mybooks", getStudentBooksHandler);
module.exports = router;

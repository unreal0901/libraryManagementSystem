const express = require("express");
const {
  getAllBookHandler,
  createBookHandler,
  updateBookHandler,
} = require("../controllers/book.controller");
const { deserializeUser } = require("../middleware/deserializeUser");
const { requireUser } = require("../middleware/requireUser");
const { validate } = require("../middleware/validate");
const { bookSchema } = require("../schema/book.schema");
const router = express.Router();

// This is deserialze middleware it checks for user have valid session and have appropriate tokens.
router.use(deserializeUser, requireUser);

router.get("/all", getAllBookHandler);
router.post("/add", validate(bookSchema), createBookHandler);
router.put("/update", updateBookHandler);
// router.delete("/remove/:id", removeBookHandler);

module.exports = router;

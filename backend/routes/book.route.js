import express from "express";
const { deserializeUser } = require("../middleware/deserializeUser");
const { requireUser } = require("../middleware/requireUser");
const { validate } = require("../middleware/validate");
// This is deserialze middleware it checks for user have valid session and have appropriate tokens.
router.use(deserializeUser, requireUser);

const router = express.Router();

// router.get("/all", validate(), getAllBookHandler);
// router.post("/add", validate(), addBookHandler);
// router.delete("/remove/:id", removeBookHandler);

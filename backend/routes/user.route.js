const express = require("express");
// const { validate } = require("../middleware/validate");
// const { registerHandler } = require("../controllers/auth.contoller");
// const { createStudentSchema } = require("../schema/student.schema");
const {
  getAllUsersHandler,
  getMeHandler,
} = require("../controllers/user.controller");
const { deserializeUser } = require("../middleware/deserializeUser");
const { requireUser } = require("../middleware/requireUser");
const { restrictTo } = require("../middleware/restrictTo");

const router = express.Router();

router.use(deserializeUser, requireUser);

// Admin Get Users route
router.get("/", restrictTo("admin"), getAllUsersHandler);

// Get my info route
router.get("/me", getMeHandler);

module.exports = router;

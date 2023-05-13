const { object, string } = require("zod");

module.exports.loginStudentSchema = object({
  body: object({
    email: string({ required_error: "Email is required" }).email({
      message: "Invalid email",
    }),
    password: string({ required_error: "Password is required" }).min(8, {
      message: "Invalid email or password",
    }),
  }),
});

module.exports.createStudentSchema = object({
  body: object({
    fullName: string({ required_error: "Full name is required" }),
    email: string({ required_error: "Email is required" }).email({
      message: "Invalid email",
    }),
  }),
});

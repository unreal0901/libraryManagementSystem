const { object, string, number } = require("zod");

const bookSchema = object({
  body: object({
    title: string({ required_error: "Title is required" }),
    author: string({ required_error: "Author is required" }),
    description: string().optional(),
    image: string().optional(),
    isbn: string({ required_error: "ISBN is required" }),
    publishedDate: string({
      required_error: "Published date is required",
      message:
        "Invalid published date, please provide a date in ISO format (e.g. YYYY-MM-DD)",
    }).regex(/^\d{4}-\d{2}-\d{2}$/),
    publisher: string().optional(),
    pageCount: number().optional(),
    language: string().optional(),
    numBooksAvailable: number({
      required_error: "Number of books available is required",
    }),
  }),
});

module.exports.bookSchema = bookSchema;

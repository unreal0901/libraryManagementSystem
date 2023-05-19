import * as Yup from "yup";

export const bookSchema = Yup.object().shape({
  body: Yup.object().shape({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    description: Yup.string().optional(),
    image: Yup.string().optional(),
    isbn: Yup.string().required("ISBN is required"),
    publishedDate: Yup.string()
      .required("Published date is required")
      .matches(
        /^\d{4}-\d{2}-\d{2}$/,
        "Invalid published date, please provide a date in ISO format (e.g. YYYY-MM-DD)"
      ),
    publisher: Yup.string().optional(),
    pageCount: Yup.number().optional(),
    language: Yup.string().optional(),
    numBooksAvailable: Yup.number().required(
      "Number of books available is required"
    ),
  }),
});

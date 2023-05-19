import React, { useEffect } from "react";
import { Field, Formik } from "formik";
import { toast } from "react-toastify";
import { format } from "date-fns";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { ThreeCircles } from "react-loader-spinner";
import { useAddBookMutation } from "../../../services/api/BookApi";
import { useSelector } from "react-redux";
import { getBookFromSearch } from "../../../features/books/BookSlice";
// import { bookSchema } from "./schema/bookSchema";
const BookForm = () => {
  const bookFromSearch = useSelector(getBookFromSearch);

  console.log(bookFromSearch);
  let {
    volumeInfo: {
      title = "",
      authors = [],
      description = "",
      imageLinks = {},
      industryIdentifiers = [],
      publishedDate = "",
      publisher = "",
      pageCount = 0,
      language = "",
    } = {},
  } = bookFromSearch ?? {};

  console.log(title);

  const bookImage = imageLinks?.smallThumbnail || imageLinks?.thumbnail;
  const isbn1 = industryIdentifiers ? industryIdentifiers[0]?.identifier : "";
  const isbn2 = industryIdentifiers ? industryIdentifiers[1]?.identifier : "";

  const initialValues = {
    title: title || "",
    author: authors?.join(",") || "",
    description: description || "",
    image: bookImage || "",
    isbn: isbn1 || isbn2 || "",
    publishedDate: publishedDate
      ? format(new Date(publishedDate), "yyyy-MM-dd")
      : format(new Date(), "yyyy-MM-dd") || "",
    publisher: publisher || "",
    pageCount: pageCount || 1,
    language: language || "",
    numBooksAvailable: 1,
  };

  console.log(initialValues);

  const [addBook, { isLoading, isSuccess }] = useAddBookMutation();

  useEffect(() => {
    if (isSuccess) toast("Book added to the library");
  });

  const addBookHandler = async (values, { setSubmitting, resetForm }) => {
    console.log("Came here");
    const payload = {
      title: values.title,
      author: values.author,
      description: values.description,
      image: values.image || "",
      isbn: values.isbn,
      publishedDate: values.publishedDate,
      publisher: values.publisher || "",
      pageCount: values.pageCount || 0,
      language: values.language || "",
      numBooksAvailable: values.numBooksAvailable || 1,
    };
    console.log(payload);

    try {
      resetForm();
      await addBook(payload).unwrap();
      setSubmitting(false);
    } catch (error) {
      console.log("An error occured during adding book: ", error);
      if (error.status === "FETCH_ERROR") {
        toast.error(`Error: ${error.error}`);
      } else {
        toast.error(`Error: ${error?.data?.message}`);
      }
    }
  };

  return (
    <>
      <div className="mb-5  w-full relative  grid place-items-center">
        <Box
          w="100%"
          display="flex"
          flexDirection="column"
          justifyContent="start"
          alignItems="center"
        >
          {isLoading && (
            <div
              className="z-[10]"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <ThreeCircles
                height="100"
                width="100"
                color="#805AD5"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=""
              />
            </div>
          )}
          <Box
            mt="2rem"
            display="flex"
            justifyContent="flex-end"
            flexDirection="column"
            alignItems="center"
            // mb={10}
          >
            {/* <Box>
              <img className="w-[100px]" src={Logo} alt="Logo" />
            </Box> */}
            <Text mb="2rem" fontSize="2rem" textAlign="center" color="gray.700">
              Add Book
            </Text>
          </Box>
          <Box
            h="60%"
            w="100%"
            pr="10px"
            pl="10px"
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Formik
              enableReinitialize={true}
              initialValues={initialValues}
              // validationSchema={bookSchema}
              onSubmit={addBookHandler}
            >
              {({
                handleSubmit,
                errors,
                touched,
                values,
                handleChange,
                handleBlur,
                isSubmitting,
              }) => (
                <>
                  <form className="w-[80%] md:w-[60%]" onSubmit={handleSubmit}>
                    <Flex
                      direction="column"
                      justify="space-between"
                      align={["normal"]}
                      gap="1rem"
                      w="100%"
                      // flexWrap={["wrap", "nowrap"]}
                    >
                      <Box>
                        <FormControl
                          isRequired
                          required
                          isInvalid={errors.title && touched.title}
                        >
                          <FormLabel
                            htmlFor="title"
                            fontSize="1rem"
                            color="gray.600"
                          >
                            Title
                          </FormLabel>
                          <InputGroup>
                            <Field
                              isDisabled={isLoading}
                              as={Input}
                              id="title"
                              name="title"
                              focusBorderColor="#805AD5"
                              value={values.title}
                              onChange={handleChange}
                              type="text"
                              h="30px"
                              placeholder="Enter Book title"
                              validate={(value) => {
                                if (!value) {
                                  return "Book title is required";
                                }
                                return null; // No validation errors
                              }}
                            />
                          </InputGroup>
                          <FormErrorMessage>{errors.title}</FormErrorMessage>
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl
                          isRequired
                          required
                          isInvalid={errors.author && touched.author}
                        >
                          <FormLabel
                            htmlFor="author"
                            fontSize="1rem"
                            color="gray.600"
                          >
                            Author
                          </FormLabel>
                          <InputGroup>
                            <Field
                              isDisabled={isLoading}
                              as={Input}
                              id="author"
                              name="author"
                              focusBorderColor="#805AD5"
                              value={values.author}
                              onChange={handleChange}
                              type="text"
                              h="30px"
                              placeholder="Enter Author"
                              validate={(value) => {
                                if (!value) {
                                  return "Author is required";
                                }
                                return null; // No validation errors
                              }}
                            />
                          </InputGroup>
                          <FormErrorMessage>{errors.author}</FormErrorMessage>
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl
                          isInvalid={errors.description && touched.description}
                        >
                          <FormLabel
                            htmlFor="description"
                            fontSize="1rem"
                            color="gray.600"
                          >
                            Description
                          </FormLabel>
                          <InputGroup>
                            <Field
                              isDisabled={isLoading}
                              as={Textarea}
                              id="description"
                              name="description"
                              focusBorderColor="#805AD5"
                              type="textField"
                              value={values.description}
                              onChange={handleChange}
                              h="30px"
                              placeholder="Enter Description"
                            />
                          </InputGroup>
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl isInvalid={errors.image && touched.image}>
                          <FormLabel
                            htmlFor="image"
                            fontSize="1rem"
                            color="gray.600"
                          >
                            Image
                          </FormLabel>
                          <InputGroup>
                            <div>
                              <input
                                // value={values.image}
                                className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-gray-900 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-gray-900 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none "
                                type="file"
                                id="image"
                                name="image"
                              />
                              <p className="inline-block text-neutral-700">
                                Upload an image of book-cover
                              </p>
                            </div>
                          </InputGroup>
                          <FormErrorMessage>{errors.image}</FormErrorMessage>
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl
                          isRequired
                          required
                          isInvalid={
                            errors.publishedDate && touched.publishedDate
                          }
                        >
                          <FormLabel
                            htmlFor="publishedDate"
                            fontSize="1rem"
                            color="gray.600"
                          >
                            Published Date
                          </FormLabel>
                          <InputGroup>
                            <Field
                              isDisabled={isLoading}
                              as={Input}
                              id="publishedDate"
                              name="publishedDate"
                              focusBorderColor="#805AD5"
                              value={values.publishedDate}
                              onChange={handleChange}
                              type="date"
                              h="30px"
                              placeholder="Enter Book publishedDate"
                              validate={(value) => {
                                if (!value) {
                                  return "Book Published Date is required";
                                }
                                return null; // No validation errors
                              }}
                            />
                          </InputGroup>
                          <FormErrorMessage>
                            {errors.publishedDate}
                          </FormErrorMessage>
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl
                          isRequired
                          required
                          isInvalid={errors.isbn && touched.isbn}
                        >
                          <FormLabel
                            htmlFor="isbn"
                            fontSize="1rem"
                            color="gray.600"
                          >
                            isbn
                          </FormLabel>
                          <InputGroup>
                            <Field
                              isDisabled={isLoading}
                              as={Input}
                              id="isbn"
                              name="isbn"
                              focusBorderColor="#805AD5"
                              value={values.isbn}
                              onChange={handleChange}
                              type="text"
                              h="30px"
                              placeholder="Enter Book isbn"
                              validate={(value) => {
                                if (!value) {
                                  return "Book isbn is required";
                                }
                                return null; // No validation errors
                              }}
                            />
                          </InputGroup>
                          <FormErrorMessage>{errors.isbn}</FormErrorMessage>
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl
                          isInvalid={errors.publisher && touched.publisher}
                        >
                          <FormLabel
                            htmlFor="publisher"
                            fontSize="1rem"
                            color="gray.600"
                          >
                            Publisher
                          </FormLabel>
                          <InputGroup>
                            <Field
                              isDisabled={isLoading}
                              as={Input}
                              id="publisher"
                              name="publisher"
                              focusBorderColor="#805AD5"
                              value={values.publisher}
                              onChange={handleChange}
                              type="text"
                              h="30px"
                              placeholder="Enter Book publisher"
                            />
                          </InputGroup>
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl
                          isInvalid={errors.pageCount && touched.pageCount}
                        >
                          <FormLabel
                            htmlFor="pageCount"
                            fontSize="1rem"
                            color="gray.600"
                          >
                            Page Count
                          </FormLabel>
                          <InputGroup>
                            <Field
                              isDisabled={isLoading}
                              as={Input}
                              id="pageCount"
                              name="pageCount"
                              focusBorderColor="#805AD5"
                              value={values.pageCount}
                              onChange={handleChange}
                              type="number"
                              h="30px"
                              placeholder="Enter Book pageCount"
                            />
                          </InputGroup>
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl
                          isInvalid={errors.language && touched.language}
                        >
                          <FormLabel
                            htmlFor="language"
                            fontSize="1rem"
                            color="gray.600"
                          >
                            Language
                          </FormLabel>
                          <InputGroup>
                            <Field
                              isDisabled={isLoading}
                              as={Input}
                              id="language"
                              name="language"
                              focusBorderColor="#805AD5"
                              value={values.language}
                              onChange={handleChange}
                              type="text"
                              h="30px"
                              placeholder="Enter Book language"
                            />
                          </InputGroup>
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl
                          isRequired
                          required
                          isInvalid={
                            errors.numBooksAvailable &&
                            touched.numBooksAvailable
                          }
                        >
                          <FormLabel
                            htmlFor="numBooksAvailable"
                            fontSize="1rem"
                            color="gray.600"
                          >
                            Number of Books available
                          </FormLabel>
                          <InputGroup>
                            <Field
                              isDisabled={isLoading}
                              as={Input}
                              id="numBooksAvailable"
                              name="numBooksAvailable"
                              focusBorderColor="#805AD5"
                              value={values.numBooksAvailable}
                              onChange={handleChange}
                              type="number"
                              h="30px"
                              placeholder="Enter Book numBooksAvailable"
                              validate={(value) => {
                                if (!value) {
                                  return "Number of books is required";
                                }
                                return null; // No validation errors
                              }}
                            />
                          </InputGroup>
                          <FormErrorMessage>
                            {errors.numBooksAvailable}
                          </FormErrorMessage>
                        </FormControl>
                      </Box>

                      <Box
                        mt="2rem"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Button
                          h="50px"
                          fontSize="1.2em"
                          w="100%"
                          type="submit"
                          colorScheme="purple"
                        >
                          Add Book
                        </Button>
                      </Box>
                    </Flex>
                  </form>
                </>
              )}
            </Formik>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default BookForm;

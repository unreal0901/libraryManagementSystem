import React from "react";
import { Field, Formik } from "formik";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  Textarea,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useUpdateBookMutation } from "../../services/api/BookApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { editBook } from "../../features/books/BookSlice";
// import { useSelector } from "react-redux";
// import { getEditBook } from "../../features/books/BookSlice";

const EditBookDrawer = ({ isDrawerOpen, closeDrawer, editBookData }) => {
  const [updateBook] = useUpdateBookMutation();
  const dispatch = useDispatch();
  const updateBookHandler = async (values, { setSubmitting, resetForm }) => {
    const payload = {
      isbn: values.isbn,
      title: values.title || "",
      author: values.author,
      description: values.description || "",
      image: values.image,
      publishedDate: values.publishedDate || "",
      publisher: values.publisher || "",
      pageCount: values.pageCount || 1,
      language: values.language || "",
      numBooksAvailable: values.numBooksAvailable,
    };

    try {
      const { data } = await updateBook(payload).unwrap();
      console.log("Book updated:", data);
      toast.success(`${payload.title} updated`);
      setSubmitting(false);
      closeDrawer();
      dispatch(editBook(null));
      resetForm();
    } catch (error) {
      console.log("An error occurred during book update:", error);
      // Handle the error based on its type or status
    }
  };

  const {
    title = "",
    author = "",
    description = "",
    image = "",
    isbn = "",
    publishedDate = "",
    publisher = "",
    pageCount = 0,
    language = "",
    numBooksAvailable = 1,
  } = editBookData ?? {};

  //   const handleSubmit = (values) => {
  //     // Handle form submission here
  //     console.log(values);
  //   };

  const initialValues = {
    title: title || "",
    author: author,
    description: description || "",
    image: image,
    isbn: isbn,
    publishedDate: publishedDate
      ? format(new Date(publishedDate), "yyyy-MM-dd")
      : format(new Date(), "yyyy-MM-dd") || "",
    publisher: publisher || "",
    pageCount: pageCount || 1,
    language: language || "",
    numBooksAvailable: numBooksAvailable || 1,
  };
  console.log(editBookData);
  console.log(initialValues);

  return (
    <>
      <Drawer
        placement="right"
        onClose={closeDrawer}
        isOpen={isDrawerOpen}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Edit Book</DrawerHeader>
          <DrawerBody>
            <Formik
              enableReinitialize={true}
              initialValues={initialValues}
              onSubmit={updateBookHandler}
              // validationSchema={bookSchema}
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
                  <form onSubmit={handleSubmit}>
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
                              //   isDisabled={isLoading}
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
                              //   isDisabled={isLoading}
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
                              //   isDisabled={isLoading}
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
                              //   isDisabled={isLoading}
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
                              //   isDisabled={isLoading}
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
                              //   isDisabled={isLoading}
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
                              //   isDisabled={isLoading}
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
                              //   isDisabled={isLoading}
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
                              //   isDisabled={isLoading}
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
                          Update Book
                        </Button>
                      </Box>
                    </Flex>
                  </form>
                </>
              )}
            </Formik>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default EditBookDrawer;

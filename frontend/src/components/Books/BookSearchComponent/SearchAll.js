import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useSearchBooksQuery } from "../../../services/api/BookApi";
import { ThreeCircles } from "react-loader-spinner";
import BooksDisplay from "./BooksDisplay";

const SearchAll = () => {
  const [payload, setPayload] = useState({});
  const { data, isLoading, isFetching, isSuccess } =
    useSearchBooksQuery(payload);
  const toast = useToast();

  const loading = isLoading || isFetching;

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Successfully fetched the books",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      console.log(data.items);
    }
  }, [isSuccess, toast, data]);

  const searchHandler = async (values, { setSubmitting, resetForm }) => {
    try {
      const { title, author, isbn } = values;
      const payload = {
        searchTerm: title || "",
        author: author || "",
        isbn: isbn || "",
      };
      console.log(payload);
      setPayload({ ...payload });
    } catch (error) {
      console.log("An error occurred during login:", error);
      if (error.status === "FETCH_ERROR") {
        toast({
          title: `Error: ${error.error}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error on fetching books",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
    setSubmitting(false);
    resetForm();
  };

  return (
    <>
      <div className="relative">
        {loading && (
          <div className="absolute top-[10%] left-[50%] z-10">
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
        <Formik
          initialValues={{ title: "", isbn: "", author: "" }}
          onSubmit={searchHandler}
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
            <Form onSubmit={handleSubmit}>
              <Box>
                <FormControl>
                  <FormLabel
                    htmlFor="title"
                    fontSize={["md", "lg"]}
                    color="gray.600"
                  >
                    Title
                  </FormLabel>
                  <InputGroup>
                    <Field
                      isDisabled={loading}
                      style={{ paddingRight: "50px" }}
                      as={Input}
                      id="title"
                      name="title"
                      focusBorderColor="#805AD5"
                      value={values.title}
                      onChange={handleChange}
                      type="text"
                      h="32px"
                      placeholder="Enter Book Title"
                    />
                    <InputRightElement
                      pointerEvents="none"
                      color="#805AD5"
                      fontSize="25px"
                      h="100%"
                      w="50px"
                      className=" rounded-r-[0.375rem]"
                    >
                      <i className="fa-solid fa-book"></i>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Box>
              <Box mt={4}>
                <FormControl>
                  <FormLabel
                    htmlFor="author"
                    fontSize={["md", "lg"]}
                    color="gray.600"
                  >
                    Author
                  </FormLabel>
                  <InputGroup>
                    <Field
                      isDisabled={loading}
                      as={Input}
                      id="author"
                      value={values.author}
                      onChange={handleChange}
                      name="author"
                      focusBorderColor="#805AD5"
                      type="text"
                      h="32px"
                      placeholder="Enter Author Name"
                    />
                    <InputRightElement
                      pointerEvents="none"
                      color="#805AD5"
                      fontSize="25px"
                      h="100%"
                      w="50px"
                      className=" rounded-r-[0.375rem]"
                    >
                      <i className="fa-solid fa-user"></i>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Box>

              <Box mt={4}>
                <FormControl>
                  <FormLabel
                    htmlFor="isbn"
                    fontSize={["md", "lg"]}
                    color="gray.600"
                  >
                    ISBN
                  </FormLabel>
                  <InputGroup>
                    <Field
                      isDisabled={loading}
                      as={Input}
                      value={values.isbn}
                      onChange={handleChange}
                      id="isbn"
                      name="isbn"
                      focusBorderColor="#805AD5"
                      type="text"
                      h="32px"
                      placeholder="Enter ISBN"
                    />
                    <InputRightElement
                      pointerEvents="none"
                      color="#805AD5"
                      fontSize="25px"
                      h="100%"
                      w="50px"
                      className=" rounded-r-[0.375rem]"
                    >
                      <i className="fa-solid fa-barcode"></i>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Box>

              <Button
                mt={4}
                colorScheme="purple"
                type="submit"
                rounded="0.375rem"
                size={["md", "lg"]}
              >
                <span className="mr-[10px]">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                Search
              </Button>
            </Form>
          )}
        </Formik>
        <BooksDisplay books={data?.items} />
      </div>
    </>
  );
};

export default SearchAll;

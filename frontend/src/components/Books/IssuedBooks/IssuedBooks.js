import React, { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  GridItem,
  Image,
  Skeleton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useGetStudentBooksQuery } from "../../../services/api/BookApi";
import { getStudentBook } from "../../../features/books/BookSlice";
import BooksIssuedDrawer from "./BooksIssuedDrawer";
import UsedBooksDrawer from "./UsedBooksDrawer";

const IssuedBooks = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isUsedOpen,
    onOpen: onUsedOpen,
    onClose: onUsedClose,
  } = useDisclosure();
  const { isLoading } = useGetStudentBooksQuery();
  const studentBooks = useSelector(getStudentBook);
  const [selectedBook, setSelectedBook] = useState(null);

  console.log(studentBooks);

  const handleShowMore = (book) => {
    setSelectedBook(book);
    onOpen();
  };

  const handleClose = () => {
    setSelectedBook(null);
    onClose();
  };

  const handleShowMoreUsed = (book) => {
    setSelectedBook(book);
    onUsedOpen();
  };

  const handleCloseUsed = () => {
    setSelectedBook(null);
    onUsedClose();
  };

  if (isLoading) return <div>Loading....</div>;
  else {
    return (
      <Box p={4}>
        <Grid templateColumns={["1fr", "1fr", "1fr 1fr"]} gap={4}>
          <GridItem width="100%">
            <Box width="100%" p={4} borderWidth={1} borderRadius="md">
              <Text fontSize="xl" fontWeight="bold" mb={4}>
                Issued Books
              </Text>
              {studentBooks?.issuedBooks?.map((book) => (
                <Box
                  margin="auto"
                  key={book._id}
                  mb={4}
                  borderWidth={1}
                  borderRadius="md"
                  boxShadow="md"
                  overflow="hidden"
                  maxW="300px"
                >
                  <Image
                    src={book.book.image}
                    alt={book.book.title}
                    objectFit="contain"
                    margin="auto"
                    // boxSize="100%"
                  />
                  <Box p={2}>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                      {book.book.title}
                    </Text>
                    <Text mb={2}>{book.book.author}</Text>
                    <Button
                      colorScheme="blue"
                      size="sm"
                      onClick={() => handleShowMore(book)}
                    >
                      Show More Info
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          </GridItem>
          <GridItem>
            <Box p={4} borderWidth={1} borderRadius="md">
              <Text fontSize="xl" fontWeight="bold" mb={4}>
                Used Books
              </Text>
              {studentBooks?.booksUsed?.map((book) => (
                <Box
                  margin="auto"
                  key={book._id}
                  mb={4}
                  borderWidth={1}
                  borderRadius="md"
                  boxShadow="md"
                  overflow="hidden"
                  maxW="300px"
                >
                  <Image
                    src={book?.book?.image}
                    alt={book?.book?.title}
                    objectFit="contain"
                    margin="auto"
                  />
                  <Box p={2}>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                      {book?.book?.title}
                    </Text>
                    <Text mb={2}>{book?.book?.author}</Text>
                    <Button
                      colorScheme="blue"
                      size="sm"
                      onClick={() => handleShowMoreUsed(book)}
                    >
                      Show More Info
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          </GridItem>
        </Grid>

        {/* Drawer for Issued Books */}
        <BooksIssuedDrawer
          Open={isOpen}
          onClose={handleClose}
          book={selectedBook}
        />

        {/* Drawer for Used Books */}
        <UsedBooksDrawer
          Open={isUsedOpen}
          onClose={handleCloseUsed}
          book={selectedBook}
        />
      </Box>
    );
  }
};

export default IssuedBooks;

import React, { useState } from "react";
import {
  Box,
  Grid,
  Image,
  Card,
  Skeleton,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { FiUpload } from "react-icons/fi";
import { useDispatch } from "react-redux";

import BookModal from "./BookModal";
import { setBook } from "../../../features/books/BookSlice";
import { toast } from "react-toastify";

const BookSkeleton = () => {
  return (
    <Card p={4} rounded="lg" overflow="hidden" height="100%">
      <Skeleton height="200px" width="100%" />
      <Box mt={2}>
        <Skeleton height="4" width="80%" />
      </Box>
    </Card>
  );
};

const BooksDisplay = ({ books }) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const dispatch = useDispatch();

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleUploadClick = (event, book) => {
    event.stopPropagation(); // Prevent click event propagation
    console.log("adding book to state");
    dispatch(setBook(book)); // Dispatch the action to add the book to Redux state
    toast("Added Book details to book form");
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  return (
    <>
      {books ? (
        <Grid
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          gap={4}
          mt={5}
        >
          {books.map((book) => {
            const {
              id,
              volumeInfo: { imageLinks, title },
            } = book;

            const bookCover =
              imageLinks?.thumbnail || imageLinks?.smallThumbnail;

            return (
              <Card
                key={id}
                p={4}
                rounded="lg"
                overflow="hidden"
                shadow="md"
                cursor="pointer"
                onClick={() => handleBookClick(book)}
              >
                {bookCover ? (
                  <Image
                    src={bookCover}
                    alt={title}
                    objectFit="contain"
                    height="200px"
                    width="100%"
                  />
                ) : (
                  <BookSkeleton />
                )}
                <IconButton
                  icon={<FiUpload />}
                  size="sm"
                  colorScheme="blue"
                  aria-label="Upload"
                  position="absolute"
                  top="5px"
                  right="5px"
                  onClick={(event) => handleUploadClick(event, book)}
                />
                <Text mt={2} fontWeight="bold" fontSize="lg">
                  {title}
                </Text>
              </Card>
            );
          })}
        </Grid>
      ) : null}

      {selectedBook && <BookModal book={selectedBook} onClose={closeModal} />}
    </>
  );
};

export default BooksDisplay;

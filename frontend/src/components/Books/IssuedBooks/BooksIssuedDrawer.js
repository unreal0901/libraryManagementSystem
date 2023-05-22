import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Image,
  Skeleton,
  Text,
  useDisclosure,
  Tag,
} from "@chakra-ui/react";
import {
  format,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  parseISO,
  differenceInBusinessDays,
} from "date-fns";
import { useReturnBookMutation } from "../../../services/api/BookApi";
import { toast } from "react-toastify";

const BooksIssuedDrawer = ({ Open, onClose, book }) => {
  const [returnBook, { isSuccess, error }] = useReturnBookMutation();
  const { book: bookData, issuedDate, returnDate } = book ?? {};
  console.log(book);
  const {
    title = "",
    image = "",
    isbn = "",
    language = "",
    author = "",
    publisher = "",
    pageCount = "",
    publishedDate = "",
    description = "",
  } = bookData ?? {};

  const [showDescription, setShowDescription] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [fineAmount, setFineAmount] = useState(null);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const formattedIssuedDate = issuedDate
    ? format(parseISO(issuedDate), "yyyy-MM-dd")
    : format(new Date(), "yyyy-MM-dd") || "";
  const formattedReturnDate = returnDate
    ? format(parseISO(returnDate), "yyyy-MM-dd")
    : format(new Date(), "yyyy-MM-dd") || "";

  useEffect(() => {
    if (isSuccess) {
      toast.success("Book Returned");
      onClose();
    }
  }, [isSuccess, onClose]);

  useEffect(() => {
    if (error) {
      toast.error(`Error : ${error}`);
      onClose();
    }
  }, [error, onClose]);

  useEffect(() => {
    // Calculate fine on the day difference
    const currentDate = new Date();
    const parsedReturnDate = parseISO(returnDate);
    const timeDifference = differenceInMinutes(parsedReturnDate, currentDate);
    console.log(timeDifference);
    if (timeDifference <= 0) {
      const timeDifferenceInDays = differenceInBusinessDays(
        parsedReturnDate,
        currentDate
      );
      const fine = Math.abs(timeDifferenceInDays) * 10; // Assuming a fine of 0.1 per minute
      console.log(fine);
      setFineAmount(fine);
      setTimeLeft(null);
    } else {
      const days = Math.floor(timeDifference / 1440);
      const hours = Math.floor((timeDifference % 1440) / 60);
      const minutes = timeDifference % 60;
      setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      setFineAmount(null);
    }

    const interval = setInterval(() => {
      const currentDate = new Date();
      const timeDifference = differenceInMinutes(parsedReturnDate, currentDate);

      if (timeDifference <= 0) {
        clearInterval(interval);
        setTimeLeft(null);
      } else {
        const days = Math.floor(timeDifference / 1440);
        const hours = Math.floor((timeDifference % 1440) / 60);
        const minutes = timeDifference % 60;
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [returnDate]);

  const returnBookHandler = async () => {
    try {
      console.log(book?.book?._id);
      const bookId = book?.book?._id;
      await returnBook(bookId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Drawer isOpen={Open} placement="left" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{title}</DrawerHeader>
        <DrawerBody>
          <Box display="flex" justifyContent="center" mb={4}>
            {image ? (
              <Image src={image} alt={title} maxH="200px" />
            ) : (
              <Skeleton height="200px" />
            )}
          </Box>
          <Box mb={4}>
            <Text fontSize="lg" fontWeight="bold">
              Title:
            </Text>
            <Text>{title}</Text>
          </Box>
          <Box mb={4}>
            <Text fontSize="lg" fontWeight="bold">
              ISBN:
            </Text>
            <Text>{isbn}</Text>
          </Box>
          <Box mb={4}>
            <Text fontSize="lg" fontWeight="bold">
              Description:
            </Text>

            <Box
              maxHeight={showDescription ? "none" : "100px"}
              overflow="hidden"
            >
              <Text>{description}</Text>
            </Box>
            {description.length > 100 && (
              <Button size="sm" onClick={toggleDescription} mt={2}>
                {showDescription ? "Show Less" : "Show More"}
              </Button>
            )}
          </Box>
          <Box
            display="flex"
            justifyContent="flex-end"
            mb={4}
            fontWeight="bold"
          >
            {fineAmount && !timeLeft ? (
              <Tag size="lg" colorScheme="red">
                Fine: ₹{fineAmount.toFixed(2)}
              </Tag>
            ) : (
              <Tag size="lg" colorScheme={timeLeft === null ? "red" : "green"}>
                {timeLeft || "No Time Left"}
              </Tag>
            )}
          </Box>
          <Box mb={4}>
            <Text fontSize="lg" fontWeight="bold">
              Issued Date:
            </Text>
            <Text>{formattedIssuedDate}</Text>
          </Box>
          <Box mb={4}>
            <Text fontSize="lg" fontWeight="bold">
              Return Date:
            </Text>
            <Text>{formattedReturnDate}</Text>
          </Box>
          <Box mb={4}>
            <Text fontSize="lg" fontWeight="bold">
              Language:
            </Text>
            <Text>{language}</Text>
          </Box>
          <Box mb={4}>
            <Text fontSize="lg" fontWeight="bold">
              Author:
            </Text>
            <Text>{author}</Text>
          </Box>
          <Box mb={4}>
            <Text fontSize="lg" fontWeight="bold">
              Publisher:
            </Text>
            <Text>{publisher}</Text>
          </Box>
          <Box mb={4}>
            <Text fontSize="lg" fontWeight="bold">
              Page Count:
            </Text>
            <Text>{pageCount}</Text>
          </Box>
          <Button colorScheme="red" size="lg" onClick={returnBookHandler}>
            Return Book
          </Button>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default BooksIssuedDrawer;

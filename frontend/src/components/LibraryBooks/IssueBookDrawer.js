import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Image,
  Text,
  Skeleton,
  Button,
  Badge,
  Tag,
  Box,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useIssueBookMutation } from "../../services/api/BookApi";
import { toast } from "react-toastify";
import { useGetAllStudentsQuery } from "../../services/api/UserApi";

const IssueBookDrawer = ({ isOpen, onClose, book, setIsIssueDrawerOpen }) => {
  const MAX_DESCRIPTION_LENGTH = 150; // Maximum length of the description
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [issueBook, { isSuccess, error }] = useIssueBookMutation();
  const { refetch: refetchStudents } = useGetAllStudentsQuery();

  useEffect(() => {
    if (isSuccess) {
      refetchStudents();
      toast.success("Book Issued");
      setIsIssueDrawerOpen(false);
    }
  }, [isSuccess, refetchStudents, setIsIssueDrawerOpen]);

  useEffect(() => {
    if (error) {
      toast.error(`Error : ${error}`);
      setIsIssueDrawerOpen(false);
    }
  }, [error, setIsIssueDrawerOpen]);

  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const issuedBookHandler = async () => {
    try {
      await issueBook(book._id);
    } catch (error) {
      console.log(error);
    }
  };

  const formattedDate = book.publishedDate
    ? format(new Date(book.publishedDate), "yyyy-MM-dd")
    : format(new Date(), "yyyy-MM-dd") || "";

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Issue Book</DrawerHeader>
        <DrawerBody>
          {book.image ? (
            <Image
              src={book.image}
              alt={book.title}
              objectFit="contain"
              objectPosition="center"
              height="200px"
              width="100%"
              mb={4}
            />
          ) : (
            <Skeleton height="200px" width="100%" mb={4} />
          )}
          <Text fontSize="2xl" fontWeight="bold" mb={2}>
            {book.title}
          </Text>
          <Text fontSize="lg" color="gray.600" mb={2}>
            by {book.author}
          </Text>
          <Badge colorScheme="teal" mb={4}>
            {book.numBooksAvailable} Books Available
          </Badge>
          <Text fontSize="md" whiteSpace="break-spaces" mb={4}>
            {book?.description?.length > MAX_DESCRIPTION_LENGTH &&
            !showFullDescription ? (
              <>
                {book?.description?.substring(0, MAX_DESCRIPTION_LENGTH)}
                {"... "}
                <Button
                  variant="link"
                  colorScheme="teal"
                  size="sm"
                  onClick={handleToggleDescription}
                >
                  Show More
                </Button>
              </>
            ) : (
              <>
                {book.description}{" "}
                {showFullDescription && (
                  <Button
                    variant="link"
                    colorScheme="teal"
                    size="sm"
                    onClick={handleToggleDescription}
                  >
                    Show Less
                  </Button>
                )}
              </>
            )}
          </Text>
          <Tag colorScheme="blue" mr={2} mb={2}>
            Publisher: {book.publisher}
          </Tag>
          <Tag colorScheme="blue" mr={2} mb={2}>
            Published Date: {formattedDate}
          </Tag>
          <Tag colorScheme="blue" mr={2} mb={2}>
            Page Count: {book.pageCount}
          </Tag>
          <Tag colorScheme="blue" mr={2} mb={2}>
            Language: {book.language}
          </Tag>
          <Tag colorScheme="blue" mr={2} mb={2}>
            ISBN: {book.isbn}
          </Tag>
          <Box>
            <Button
              colorScheme="blue"
              mt={10}
              justifySelf="center"
              alignSelf="center"
              onClick={issuedBookHandler}
            >
              Issue Book
            </Button>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default IssueBookDrawer;

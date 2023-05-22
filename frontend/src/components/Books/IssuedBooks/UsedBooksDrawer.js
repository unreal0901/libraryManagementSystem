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
  Image,
  Skeleton,
  Text,
  Link,
  Tag,
} from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import { toast } from "react-toastify";

const UsedBooksDrawer = ({ Open, onClose, book }) => {
  const { book: bookData, issuedDate, returnDate, fineAmount } = book ?? {};
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

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const formattedIssuedDate = issuedDate
    ? format(parseISO(issuedDate), "yyyy-MM-dd")
    : format(new Date(), "yyyy-MM-dd") || "";
  const formattedReturnDate = returnDate
    ? format(parseISO(returnDate), "yyyy-MM-dd")
    : format(new Date(), "yyyy-MM-dd") || "";

  return (
    <Drawer isOpen={Open} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Tag colorScheme="teal" size="sm" mr={2}>
            Fine Paid : ₹ {fineAmount}
          </Tag>
          {title}
        </DrawerHeader>
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
          <Link to="books">
            <Button colorScheme="red" size="lg">
              Re-Issue
            </Button>
          </Link>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default UsedBooksDrawer;

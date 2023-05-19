import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Image,
  Box,
  Text,
  Button,
  Tag,
} from "@chakra-ui/react";

const BookModal = ({ book, onClose }) => {
  const {
    volumeInfo: {
      title,
      authors,
      description,
      publisher,
      publishedDate,
      imageLinks,
      pageCount,
      language,
      categories,
    },
  } = book;

  const bookCover = imageLinks?.thumbnail || imageLinks?.smallThumbnail;
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <Modal isOpen={true} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box
            display="grid"
            gridTemplateColumns={{ base: "1fr", md: "1fr 2fr" }}
            gap={6}
          >
            <Box display="flex" justifyContent="center" alignItems="center">
              <Image
                src={bookCover}
                alt={title}
                maxH="80"
                objectFit="contain"
              />
            </Box>
            <Box>
              <Text fontSize="sm" fontWeight="semibold">
                Author(s):
              </Text>
              <Text>{authors?.join(", ")}</Text>
              <Text fontSize="sm" fontWeight="semibold" mt={2}>
                Publisher:
              </Text>
              <Text>{publisher}</Text>
              <Text fontSize="sm" fontWeight="semibold" mt={2}>
                Published Date:
              </Text>
              <Text>{publishedDate}</Text>
              <Text fontSize="sm" fontWeight="semibold" mt={2}>
                Page Count:
              </Text>
              <Text>{pageCount}</Text>
              <Text fontSize="sm" fontWeight="semibold" mt={2}>
                Language:
              </Text>
              <Text>{language}</Text>
              <Text fontSize="sm" fontWeight="semibold" mt={2}>
                Categories:
              </Text>
              <Box>
                {categories?.map((category) => (
                  <Tag key={category} colorScheme="blue" mt={1} mr={1}>
                    {category}
                  </Tag>
                ))}
              </Box>
            </Box>
          </Box>
          <Box mt={4}>
            <Text className={`${showFullDescription ? "" : "line-clamp-3"}`}>
              {description}
            </Text>
            {description?.length > 250 && (
              <Button
                variant="link"
                color="blue.500"
                mt={2}
                onClick={handleToggleDescription}
              >
                {showFullDescription ? "Show Less" : "Show More"}
              </Button>
            )}
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BookModal;

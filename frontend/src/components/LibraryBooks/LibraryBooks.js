import React, { useState } from "react";
import { useGetBooksQuery } from "../../services/api/BookApi";
import {
  Grid,
  Box,
  Image,
  Text,
  Skeleton,
  Card,
  IconButton,
  Tag,
  Button,
  Select,
  Input,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllLibraryBooks,
  editBook,
  getEditBook,
  issueBook,
  getIssueBook,
} from "../../features/books/BookSlice";
import { FiBook, FiEdit } from "react-icons/fi";
import { getUser } from "../../features/user/UserSlice";
import EditBookDrawer from "./EditBookDrawer";
import { toast } from "react-toastify";
import IssueBookDrawer from "./IssueBookDrawer";

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

const Gallery = () => {
  return (
    <Grid
      templateColumns={["1fr", "1fr 1fr", "1fr 1fr 1fr"]}
      gap={4}
      mx="auto"
      maxWidth="1200px"
      padding={4}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
        <Skeleton key={index} height="200px" rounded="lg" />
      ))}
    </Grid>
  );
};

const LibraryBooks = () => {
  const { isLoading } = useGetBooksQuery();
  const allLibraryBooks = useSelector(getAllLibraryBooks);
  const editBookData = useSelector(getEditBook) ?? {};
  const issueBookData = useSelector(getIssueBook) ?? {};
  const user = useSelector(getUser);
  const isAdmin = user?.data[0]?.role === "admin";

  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isIssueDrawerOpen, setIsIssueDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");

  const openIssueDrawer = (book) => {
    dispatch(issueBook(book));
    setIsIssueDrawerOpen(true);
    toast("Issue Book, form pre-filled");
  };

  const closeIssueDrawer = () => {
    setIsIssueDrawerOpen(false);
  };

  const openDrawer = (book) => {
    dispatch(editBook(book));
    setIsDrawerOpen(true);
    toast("Edit Book, form pre-filled");
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleSearch = () => {
    // No need for separate filtering logic here, as searchTerm is directly used in filtering

    // Force re-render by updating state variables
    setSearchTerm(searchTerm);
  };

  const handleSortOptionChange = (e) => {
    setSortOption(e.target.value);
  };

  const filteredBooks = allLibraryBooks.filter((book) => {
    const { isbn, title, description } = book;
    return (
      isbn.includes(searchTerm) ||
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (description &&
        description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const sortedBooks = filteredBooks.sort((a, b) => {
    if (sortOption === "publishedDate") {
      return new Date(b.publishedDate) - new Date(a.publishedDate);
    } else if (sortOption === "numBooksAvailable") {
      return b.numBooksAvailable - a.numBooksAvailable;
    } else {
      return 0;
    }
  });

  return (
    <>
      {isLoading ? (
        <Gallery />
      ) : (
        <Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexWrap="wrap"
            mb={4}
            mt={4}
            mx={[2, 4]}
          >
            <Input
              placeholder="Search by ISBN, title, or description"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              mr={2}
              mb={2}
              w={["100%", "300px"]}
            />
            <Box display="flex">
              <Select
                placeholder="Sort by"
                value={sortOption}
                onChange={handleSortOptionChange}
                w={["100%", "200px"]}
              >
                <option value="publishedDate">Published Date</option>
                <option value="numBooksAvailable">
                  Number of Books Available
                </option>
              </Select>
              <Button onClick={handleSearch} ml={2} mb={2}>
                Search
              </Button>
            </Box>
          </Box>

          {filteredBooks.length === 0 ? (
            <Text>No books found.</Text>
          ) : (
            <Grid
              templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
              gap={4}
              mx="auto"
              maxWidth="1200px"
              padding={4}
            >
              {sortedBooks.map((book) => (
                <Card
                  key={book._id}
                  p={0}
                  rounded="lg"
                  overflow="hidden"
                  height="100%"
                  width="100%"
                  boxShadow="md"
                  position="relative"
                >
                  {book.image ? (
                    <Image
                      src={book.image}
                      alt={book.title}
                      objectFit="contain"
                      objectPosition="center"
                      height="200px"
                      width="100%"
                    />
                  ) : (
                    <BookSkeleton />
                  )}
                  <Box mt={2} p={4}>
                    <Text fontSize="xl" fontWeight="bold">
                      {book.title}
                    </Text>
                    <Text>{book.author}</Text>
                  </Box>
                  <Tag
                    position="absolute"
                    variant="solid"
                    top={2}
                    left={2}
                    colorScheme="red"
                    size="lg"
                    borderRadius="full"
                    px={3}
                    py={1}
                    color="white"
                  >
                    {book.numBooksAvailable}
                  </Tag>
                  {isAdmin ? (
                    <IconButton
                      icon={<FiEdit />}
                      size="sm"
                      colorScheme="blue"
                      aria-label="Edit"
                      position="absolute"
                      top="5px"
                      right="5px"
                      onClick={() => openDrawer(book)}
                    />
                  ) : (
                    <IconButton
                      icon={<FiBook />}
                      size="sm"
                      colorScheme="green"
                      aria-label="Issue"
                      position="absolute"
                      top="5px"
                      right="5px"
                      onClick={() => openIssueDrawer(book)}
                    />
                  )}
                </Card>
              ))}
            </Grid>
          )}
        </Box>
      )}

      <EditBookDrawer
        isDrawerOpen={isDrawerOpen}
        closeDrawer={closeDrawer}
        editBookData={editBookData}
      />
      <IssueBookDrawer
        isOpen={isIssueDrawerOpen}
        onClose={closeIssueDrawer}
        setIsIssueDrawerOpen={setIsIssueDrawerOpen}
        book={issueBookData}
      />
    </>
  );
};

export default LibraryBooks;

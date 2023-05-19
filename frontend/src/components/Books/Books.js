import BookForm from "./BookForm/BookForm";
import BookSearchComponent from "./BookSearchComponent/BookSearchComponent";
import { Grid, GridItem } from "@chakra-ui/react";

const Books = () => {
  return (
    <Grid
      templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
      gap={4}
      justifyContent="center"
    >
      <GridItem order={{ base: 1, lg: 2 }}>
        <BookForm />
      </GridItem>

      <GridItem
        order={{ base: 2, lg: 1 }}
        borderRight={{ base: "none", lg: "1px solid #CBD5E0" }}
        borderTop={{ base: "1px solid #CBD5E0", lg: "none" }}
        borderColor="#CBD5E0"
      >
        <BookSearchComponent />
      </GridItem>
    </Grid>
  );
};

export default Books;

// o.[%l~YR&>

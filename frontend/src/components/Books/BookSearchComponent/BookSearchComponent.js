import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import SearchAll from "./SearchAll";

const BookSearchComponent = () => {
  return (
    <Grid placeItems="center">
      <GridItem>
        <Box w={["100%", "500px"]} mx="auto" mt={2}>
          <Tabs colorScheme="purple" variant="soft-rounded" isLazy>
            <TabList mb="1em">
              <Tab>Search Book to add</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SearchAll />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default BookSearchComponent;

import React, { useState } from "react";
import {
  Box,
  Grid,
  Text,
  Badge,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Avatar,
  Flex,
  Input,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useGetAllStudentsQuery } from "../../services/api/UserApi";
import { getStudents } from "../../features/user/UserSlice";
import { useSelector } from "react-redux";
import StudentRegister from "./StudentRegister";

const UserCard = ({ user }) => {
  const { fullName, email, issuedBooks, totalFine } = user;

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p="4"
      mb="4"
      mt="4"
      shadow="md"
      bg="white"
      maxWidth="400px"
      mx="auto"
    >
      <Flex justifyContent="center" mb="2">
        <Avatar name={fullName} size="lg" />
      </Flex>
      <Text fontSize="xl" fontWeight="bold" mb="2" textAlign="center">
        {fullName}
      </Text>
      <Text>Email: {email}</Text>
      <Text>
        Issued Books:
        {issuedBooks.length > 0 && (
          <Badge colorScheme="teal" ml="1">
            {issuedBooks.length}
          </Badge>
        )}
      </Text>
      <Text>Total Fine: ₹ {totalFine}</Text>
    </Box>
  );
};

const UserSearch = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <Box mb="4" width="50%" margin="auto">
      <Input
        placeholder="Search by email"
        value={searchTerm}
        onChange={handleChange}
        colorScheme="purple"
        focusBorderColor="#805AD5"
      />
    </Box>
  );
};

const Students = () => {
  const { isLoading, isFetching } = useGetAllStudentsQuery();
  const students = useSelector(getStudents)?.data;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filteredStudents, setFilteredStudents] = useState([]);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleSearch = (searchTerm) => {
    const filtered = students.filter(
      (student) =>
        student.email.includes(searchTerm) ||
        student.fullName.includes(searchTerm)
    );
    setFilteredStudents(filtered);
  };

  if (isLoading || isFetching) return <div>Loading...</div>;

  return (
    <>
      <Box mt="2" display="flex" justifyContent="center" mb="4">
        <Button
          leftIcon={<AddIcon />}
          colorScheme="purple"
          size="lg"
          onClick={handleDrawerOpen}
        >
          Register Student
        </Button>
      </Box>

      <UserSearch handleSearch={handleSearch} />

      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap="4">
        {(filteredStudents.length > 0 ? filteredStudents : students)?.map(
          (student) => (
            <UserCard key={student._id} user={student} />
          )
        )}
      </Grid>
      <StudentRegister
        isDrawerOpen={isDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
    </>
  );
};

export default Students;

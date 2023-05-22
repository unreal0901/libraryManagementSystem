import { Field, Form, Formik } from "formik";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { useCreateStudentMutation } from "../../services/api/UserApi";
import { toast } from "react-toastify";

const StudentRegister = ({ isDrawerOpen, handleDrawerClose }) => {
  const [registerStudent, { isSuccess }] = useCreateStudentMutation();
  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    // Add your logic to handle form submission here
    const payload = {
      fullName: values.fullName,
      email: values.email,
    };
    console.log(payload);
    try {
      resetForm();
      await registerStudent(payload).unwrap();
      setSubmitting(false);
      toast.success("Student Registered");
      handleDrawerClose();
    } catch (error) {
      console.log("An error occurred during login:", error);
      if (error.status === "FETCH_ERROR") {
        toast.error(`Error: ${error.error}`);
      } else {
        toast.error(`Error: ${error}`);
      }
    }
  };

  return (
    <>
      <Drawer
        isOpen={isDrawerOpen}
        placement="left"
        onClose={handleDrawerClose}
        size="md"
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">
              Register Student
            </DrawerHeader>
            <DrawerBody>
              <Formik
                initialValues={{
                  fullName: "",
                  email: "",
                }}
                onSubmit={handleSubmit}
              >
                <Form>
                  <Field
                    focusBorderColor="#805AD5"
                    name="fullName"
                    validate={(value) => {
                      let error;
                      if (!value) {
                        error = "Full Name is required";
                      }
                      return error;
                    }}
                  >
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.fullName && form.touched.fullName
                        }
                      >
                        <FormLabel htmlFor="fullName">Full Name</FormLabel>
                        <Input
                          focusBorderColor="#805AD5"
                          {...field}
                          id="fullName"
                          placeholder="Enter full name"
                        />
                        <FormErrorMessage>
                          {form.errors.fullName}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field
                    focusBorderColor="#805AD5"
                    name="email"
                    validate={(value) => {
                      let error;
                      if (!value) {
                        error = "Email is required";
                      } else if (!/^\S+@\S+\.\S+$/.test(value)) {
                        error = "Invalid email address";
                      }
                      return error;
                    }}
                  >
                    {({ field, form }) => (
                      <FormControl
                        mt={4}
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input
                          focusBorderColor="#805AD5"
                          {...field}
                          id="email"
                          placeholder="Enter email"
                        />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Button
                    mt={4}
                    colorScheme="purple"
                    type="submit"
                    // isLoading={isSubmitting}
                  >
                    Submit
                  </Button>
                </Form>
              </Formik>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default StudentRegister;

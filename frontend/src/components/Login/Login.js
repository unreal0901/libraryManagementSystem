import React, { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
// import styles from "./Login.module.css";
import Logo from "../../assets/Logo.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  // Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../services/api/AuthApi";
import { LoginSchema } from "./schemas/loginSchema";
import { useSelector } from "react-redux";
import { getUser } from "../../features/user/UserSlice";
// import { useGetMeQuery } from "../../services/api/UserApi";
// import FullScreenLoader from "../FullScreenLoader/FullScreenLoader";
const Login = () => {
  // const location = useLocation();
  // const { isFetching, isLoading: getmeLoading } = useGetMeQuery();
  const [show, setShow] = useState(false);
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const [login, { isSuccess, isLoading }] = useLoginUserMutation();

  useEffect(() => {
    if (user && user?.data[0]) navigate("/app", { from: "login" });
  }, [user, navigate]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/app");
    }
  }, [isSuccess, navigate]);

  const handleClick = () => {
    setShow(!show);
  };

  const loginHandler = async (values, { setSubmitting, resetForm }) => {
    const payload = {
      email: values.email,
      password: values.password,
    };
    console.log(payload);
    try {
      resetForm();
      await login(payload).unwrap();
      setSubmitting(false);
      navigate("/app");
    } catch (error) {
      console.log("An error occurred during login:", error);
      if (error.status === "FETCH_ERROR") {
        toast.error(`Error: ${error.error}`);
      }
    }
  };

  return (
    <>
      {/* {getmeLoading || isFetching ? <FullScreenLoader /> : null} */}
      <div className="relative h-screen md:w-1/2 flex justify-center items-center w-full ">
        <Box
          w="100%"
          h="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          {isLoading && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <ThreeCircles
                height="100"
                width="100"
                color="#805AD5"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=""
              />
            </div>
          )}
          <Box
            h="20%"
            display="flex"
            justifyContent="flex-end"
            flexDirection="column"
            alignItems="center"
            // mb={10}
          >
            <Box>
              <img className="w-[100px]" src={Logo} alt="Logo" />
            </Box>
            <Text
              fontSize="3em"
              // h="100%"
              textAlign="center"
              color="gray.700"
              mb={2}
            >
              Login
            </Text>
          </Box>
          <Box
            h="60%"
            w="100%"
            pr="10px"
            pl="10px"
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Formik
              initialValues={{
                email: "",
                password: "",
                rememberMe: false,
              }}
              validationSchema={LoginSchema}
              onSubmit={loginHandler}
            >
              {({
                handleSubmit,
                errors,
                touched,
                values,
                handleChange,
                handleBlur,
                isSubmitting,
              }) => (
                <>
                  <form className="w-80" onSubmit={handleSubmit}>
                    <Stack direction="column" spacing={4} w="100%">
                      <Box>
                        <FormControl
                          required
                          isInvalid={errors.email && touched.email}
                        >
                          <FormLabel
                            htmlFor="email"
                            fontSize="1.5em"
                            color="gray.600"
                          >
                            Email
                          </FormLabel>
                          <InputGroup>
                            <Field
                              isDisabled={isLoading}
                              style={{ paddingRight: "50px" }}
                              as={Input}
                              id="email"
                              name="email"
                              focusBorderColor="#805AD5"
                              value={values.email}
                              onChange={handleChange}
                              type="email"
                              h="50px"
                              placeholder="Enter email"
                              validate={(value) => {
                                if (!value) {
                                  return "Email is required";
                                }
                                if (
                                  !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(
                                    value
                                  )
                                ) {
                                  return "Invalid email format";
                                }
                                return null; // No validation errors
                              }}
                            />
                            <InputRightElement
                              color="#805AD5"
                              fontSize="25px"
                              h="100%"
                              w="50px"
                            >
                              <i className="fa-solid fa-at"></i>
                            </InputRightElement>
                          </InputGroup>
                          <FormErrorMessage>{errors.email}</FormErrorMessage>
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl
                          required
                          isInvalid={errors.password && touched.password}
                        >
                          <FormLabel
                            htmlFor="password"
                            fontSize="1.5em"
                            color="gray.600"
                          >
                            Password
                          </FormLabel>
                          <InputGroup size="md">
                            <Field
                              isDisabled={isLoading}
                              as={Input}
                              autoComplete="on"
                              id="password"
                              name="password"
                              value={values.password}
                              onChange={handleChange}
                              h="50px"
                              focusBorderColor="#805AD5"
                              pr="4.5rem"
                              type={show ? "text" : "password"}
                              placeholder="Enter password"
                              validate={(value) => {
                                if (value.length <= 6) {
                                  return "Passwords should be greater then 6";
                                }
                              }}
                            />
                            <InputRightElement
                              color="#805AD5"
                              fontSize="25px"
                              h="100%"
                              w="50px"
                              cursor="pointer"
                              onClick={handleClick}
                            >
                              {show ? (
                                <i className="fa-solid fa-eye-slash"></i>
                              ) : (
                                <i className="fa-sharp fa-solid fa-eye"></i>
                              )}
                            </InputRightElement>
                          </InputGroup>
                          <FormErrorMessage>{errors.password}</FormErrorMessage>
                        </FormControl>
                      </Box>
                      <Box>
                        <Checkbox
                          id="rememberMe"
                          name="rememberMe"
                          size="md"
                          value={values.rememberMe}
                          onChange={handleChange}
                          colorScheme="purple"
                        >
                          Remember me
                        </Checkbox>
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Button
                          h="50px"
                          fontSize="1.2em"
                          w="100%"
                          type="submit"
                          colorScheme="purple"
                        >
                          Submit
                        </Button>
                      </Box>
                    </Stack>
                  </form>
                </>
              )}
            </Formik>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Login;

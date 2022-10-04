import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  VStack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AuthLayout from "../Layout/AuthLayout";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

//Redux Imports
import { LoginAction } from "../redux/actions/auth/auth.action";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const [userLogin, SetUserLogin] = useState({
    email: "",
    password: "",
    error: "",
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const toast = useToast();
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    SetUserLogin((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onHandleSubmit = (event) => {
    event.preventDefault();
    let user = {
      email: userLogin.email,
      password: userLogin.password,
    };
    dispatch(LoginAction(user, navigate));
  };
  // if (user?.isAauthenticated) {
  //   // toast({
  //   // 	title: '🎉 Successfully logged in',
  //   // 	status: 'success',
  //   // 	duration: 3000,
  //   // 	isClosable: true,
  //   // });
  //   navigate("/projects", { replace: true });
  // }

  // if (user?.isAuthenticating) {
  //   return <Loader />;
  // }
  return (
    <AuthLayout>
      <Text
        fontSize="large"
        textAlign="center"
        color="gray.600"
        fontWeight="bold"
        mb="2"
      >
        Hello 👋 <br />
      </Text>
      <Text fontSize="large" textAlign="center" color="gray.500" mb="8">
        Welcome to OnboardOps
      </Text>
      <form onSubmit={onHandleSubmit}>
        <VStack spacing="5" justify="space-between">
          <FormControl isRequired>
            <FormLabel htmlFor="username">Email</FormLabel>
            <Input
              size="lg"
              id="user-email"
              placeholder="Email"
              name="email"
              value={userLogin.email}
              onChange={onChangeHandler}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="user-password">Password</FormLabel>
            <Input
              size="lg"
              id="user-password"
              placeholder="Password"
              type="password"
              name="password"
              value={userLogin.password}
              onChange={onChangeHandler}
            />
          </FormControl>
          <Button
            isLoading={user?.loader?.buttonLoader}
            // isLoading={signUpResult.fetching || loginResult.fetching}
            colorScheme="teal"
            size="lg"
            w="100%"
            d="block"
            type="submit"
          >
            Login
          </Button>
          {/* {login ? (
						<Text color='gray.600' fontSize='sm'>
							<b>Note:</b> Some note <code>Note</code> Some note{' '}
						</Text>
					) : (
						<Text color='gray.600' fontSize='sm'>
							<b>Note:</b> Configure the password to start using your dashboard.
						</Text>
					)} */}
        </VStack>
      </form>
    </AuthLayout>
  );
}

import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { ArrowBackIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Loader from "../components/Loader";
import {
  Tabs,
  Text,
  Button,
  Modal,
  useToast,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  InputRightElement,
  InputGroup,
  FormControl,
  FormLabel,
  Input,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import { DatePicker } from "chakra-ui-date-input";
import { SignupAction, AddProjectAction } from "../redux/actions/";
import { Link, useNavigate } from "react-router-dom";

const Frontpage = () => {
  // temp
  const [isNavigate, SetIsNavigate] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const initialRef = useRef();
  const finalRef = useRef();

  // ALL ABOUT SIGN UP AND
  const [showPassword, setShowPassword] = useState(false);
  const authStateData = useSelector((state) => state.auth);
  const projectStateData = useSelector((state) => state.project);
  const [signup, setSignUp] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
    error: "",
  });
  const [project, setProject] = useState({
    title: "",
    kickOff: "",
    magic_link: "",
    error: "",
  });
  const onChangeHandler = (e) => {
    setSignUp((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    setProject((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onHandleSubmit = async () => {
    let user = {
      fullName: signup.fullName,
      email: signup.email,
      password: signup.password,
      // role: signup.role,
    };
    let projectData = {
      title: project.title,
      kickOff: project.kickOff,
    };

    // NEEDS TO CHANGE
    dispatch(SignupAction(user)).then((res) => {
      if (res.status === 200) {
        dispatch(AddProjectAction(projectData));
      }
    });
  };

  useEffect(() => {
    if (authStateData?.isSignedUp && projectStateData.isProjectAdded) {
      toast({
        title: `🎉 ${authStateData.message} and ${projectStateData.message}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate(`/dashboard/${projectStateData?.project?._id}`, {
        replace: true,
      });
    }
  }, [signup, authStateData, navigate, projectStateData, project]);

  //LOADER
  if (authStateData?.isSigningIn && projectStateData.isProjectAdding) {
    return <Loader />;
  }

  return (
    <div>
      <Tabs align="end">
        <Button colorScheme="teal" variant="solid" mt={4} mr={4}>
          <Link to="/login">Log in</Link>
        </Button>
        <Button
          onClick={onOpen}
          colorScheme="teal"
          variant="outline"
          mt={4}
          mr={4}
        >
          Create project
        </Button>
      </Tabs>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        {!isNext ? (
          <ModalContent>
            <ModalHeader fontSize={28}>Start Your First Project</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={5}>
              <FormControl>
                <FormLabel>Customer Name*</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Title"
                  id="title"
                  onChange={onChangeHandler}
                  name="title"
                  value={project.title}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Project kickoff</FormLabel>
                <Input
                  type="date"
                  id="kickOff"
                  onChange={onChangeHandler}
                  name="kickOff"
                  value={project.kickOff}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" onClick={() => setIsNext(!isNext)}>
                Next
              </Button>
            </ModalFooter>
          </ModalContent>
        ) : (
          <ModalContent>
            <ArrowBackIcon
              onClick={() => setIsNext(!isNext)}
              w={6}
              h={6}
              mt={4}
              ml={4}
            />
            <ModalHeader fontSize={28}>Choose a template</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Button>Customer onboarding for B2B software</Button>
            </ModalBody>
            <ModalBody pb={6} mt={16}>
              <Button
                colorScheme="teal"
                variant="outline"
                onClick={() => setIsLogOpen(!isLogOpen)}
              >
                Create project using template
              </Button>
            </ModalBody>
            {/* <ModalFooter></ModalFooter> */}
          </ModalContent>
        )}
      </Modal>

      {/* SIGN UP MODAL */}
      {isLogOpen ? (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            <ArrowBackIcon
              onClick={() => setIsLogOpen(!isLogOpen)}
              w={6}
              h={6}
              mt={4}
              ml={4}
            />
            <ModalHeader fontSize={28}>Howdy! It's time to Sign Up</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={5}>
              <FormControl>
                <Input
                  ref={initialRef}
                  placeholder="Full Name"
                  value={signup.fullName}
                  name="fullName"
                  onChange={onChangeHandler}
                />
              </FormControl>
              <FormControl mt={5}>
                <Input
                  ref={initialRef}
                  placeholder="Email"
                  type="email"
                  value={signup.email}
                  name="email"
                  onChange={onChangeHandler}
                />
              </FormControl>
              {/* <FormControl mt={5}>
								<Input ref={initialRef} placeholder='Password' type={showPassword ? 'text' : 'password'} />
							</FormControl> */}
              <InputGroup mt={5}>
                <Input
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={signup.password}
                  name="password"
                  onChange={onChangeHandler}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                w="100%"
                type="submit"
                loadingText="Signing up"
                onClick={() => onHandleSubmit()}
              >
                Sign up
              </Button>
            </ModalFooter>
            <Divider />
            <ModalFooter>
              <Button colorScheme="blue" w="100%" variant="outline">
                <FcGoogle size={28} />
                <Text ml={6}>Sign in with Google</Text>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
};

export default Frontpage;

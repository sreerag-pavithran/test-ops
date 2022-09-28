import { useState, useEffect, useRef } from 'react';
import {
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
	Modal,
	HStack,
	Stack,
	Button,
	Heading,
	Text,
	VStack,
	useToast,
	useDisclosure,
	Divider,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { ArrowBackIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import Loader from '../components/Loader';
import { Link, useNavigate } from 'react-router-dom';

//Redux Imports
import { SignupAction } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function Signup({ setIsLogOpen, isLogOpen }) {
	const [showPassword, setShowPassword] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const toast = useToast();
	const initialRef = useRef();
	const finalRef = useRef();
	const auth = useSelector((state) => state.auth);
	const [signup, setSignUp] = useState({
		fullName: '',
		email: '',
		password: '',
		role: '',
		error: '',
	});
	const onChangeHandler = (e) => {
		setSignUp((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onHandleSubmit = (event) => {
		event.preventDefault();
		let user = {
			firstName: signup.firstName,
			lastName: signup.lastName,
			email: signup.email,
			password: signup.password,
			// role: signup.role,
		};
		console.log('User from Add user', user);
		dispatch(SignupAction(user));
	};
	useEffect(() => {
		if (auth?.isSignedUp) {
			toast({
				title: `🎉 ${auth.message}`,
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
			navigate('/login', { replace: true });
		}
	}, [auth, navigate]);
	if (auth?.isSigningIn) {
		return <Loader />;
	}
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalContent>
				<ArrowBackIcon onClick={() => setIsLogOpen(!isLogOpen)} w={6} h={6} mt={4} ml={4} />
				<ModalHeader fontSize={28}>Howdy! It's time to Sign Up</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={5}>
					<FormControl>
						<Input
							ref={initialRef}
							placeholder='Full Name'
							value={signup.fullName}
							name='fullName'
							onChange={onChangeHandler}
						/>
					</FormControl>
					<FormControl mt={5}>
						<Input
							ref={initialRef}
							placeholder='Email'
							type='email'
							value={signup.email}
							name='email'
							onChange={onChangeHandler}
						/>
					</FormControl>
					{/* <FormControl mt={5}>
								<Input ref={initialRef} placeholder='Password' type={showPassword ? 'text' : 'password'} />
							</FormControl> */}
					<InputGroup mt={5}>
						<Input
							placeholder='Password'
							type={showPassword ? 'text' : 'password'}
							value={signup.password}
							name='password'
							onChange={onChangeHandler}
						/>
						<InputRightElement h={'full'}>
							<Button variant={'ghost'} onClick={() => setShowPassword((showPassword) => !showPassword)}>
								{showPassword ? <ViewIcon /> : <ViewOffIcon />}
							</Button>
						</InputRightElement>
					</InputGroup>
				</ModalBody>
				<ModalFooter>
					<Button colorScheme='blue' w='100%' type='submit' loadingText='Signing up' onClick={onHandleSubmit}>
						Sign up
					</Button>
				</ModalFooter>
				<Divider />
				<ModalFooter>
					<Button colorScheme='blue' w='100%' variant='outline'>
						<FcGoogle size={28} />
						<Text ml={6}>Sign in with Google</Text>
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

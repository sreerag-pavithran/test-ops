import React, { useState } from 'react';
import { Box, Flex, Image, Text, Spinner, useMediaQuery } from '@chakra-ui/react';

const AuthLayout = ({ children }) => {
	const [isNotSmallerScreen] = useMediaQuery('(min-width:600px)');
	const [fetching, setFetching] = useState(false);
	return (
		<div>
			<Flex flexWrap='wrap' h='100vh' bg='gray.100' alignItems='center' justifyContent='center' flexDirection='column'>
				{/* <Flex alignItems='center'>
					<Text fontSize='x-large' ml='3' letterSpacing='3'>
						ADMIN
					</Text>
				</Flex> */}

				{fetching ? (
					<Spinner />
				) : (
					<>
						<Box p='6' m='5' rounded='5' bg='white' w={isNotSmallerScreen ? '450px' : '400px'} shadow='xl'>
							{children}
						</Box>
						{/* <Text color='gray.600' fontSize='sm'>
							Current Version
						</Text> */}
					</>
				)}
			</Flex>
		</div>
	);
};

export default AuthLayout;

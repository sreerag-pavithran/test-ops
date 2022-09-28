import React from 'react';
import { Spinner } from '@chakra-ui/react';

const Loader = () => {
	return (
		<div style={{ position: 'absolute', top: '50%', left: '50%' }}>
			<Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
		</div>
	);
};

export default Loader;

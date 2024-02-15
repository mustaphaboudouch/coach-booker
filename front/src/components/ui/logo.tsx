import { Box } from '@mantine/core';
import { Link } from '@tanstack/react-router';

const Logo = () => {
	return (
		<Box component={Link} preload={false} to='/'>
			<h3>Coach Booker</h3>
		</Box>
	);
};

export { Logo };

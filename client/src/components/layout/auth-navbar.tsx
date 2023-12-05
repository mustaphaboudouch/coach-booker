import { Button, Flex } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ColorSchemaSwitcher } from '../ui/color-schema-switcher';

export const AuthNavbar = () => {
	return (
		<Flex
			align='center'
			justify='space-between'
			px='lg'
			style={{ height: '100%' }}
		>
			<Flex align='center'>
				<Link to='/'>Coach Booker</Link>
			</Flex>
			<Flex align='center' gap={16}>
				<Button variant='filled' component={Link} to='/sign-in'>
					Se connecter
				</Button>
				<Button variant='outline' component={Link} to='/sign-up'>
					S'inscrire
				</Button>
				<ColorSchemaSwitcher />
			</Flex>
		</Flex>
	);
};

import { Button, Flex } from '@mantine/core';
import { Link } from '@tanstack/react-router';
import { ColorSchemaSwitcher } from '../../components/color-schema-switcher';

export const Navbar = () => {
	return (
		<Flex
			align='center'
			justify='space-between'
			px='lg'
			style={{ height: '100%' }}
		>
			<Flex align='center'>
				<h3>Coach Booker</h3>
			</Flex>
			<Flex align='center' gap={16}>
				<ColorSchemaSwitcher />
				<Button variant='filled' component={Link} to='/sign-in'>
					Se connecter
				</Button>
				<Button variant='outline' component={Link} to='/sign-up'>
					S'inscrire
				</Button>
			</Flex>
		</Flex>
	);
};

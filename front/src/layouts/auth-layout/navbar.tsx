import { Button, Flex } from '@mantine/core';
import { Link } from '@tanstack/react-router';
import { ColorSchemaSwitcher } from '../../components/ui/color-schema-switcher';
import { Logo } from '../../components/ui/logo';

export const Navbar = () => {
	return (
		<Flex
			align='center'
			justify='space-between'
			px='lg'
			style={{ height: '100%' }}
		>
			<Flex align='center'>
				<Logo />
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

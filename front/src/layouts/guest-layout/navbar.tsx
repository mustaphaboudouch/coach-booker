import { Button, Flex } from '@mantine/core';
import { ColorSchemaSwitcher } from '../../components/ui/color-schema-switcher';
import { Link } from '@tanstack/react-router';
import { Logo } from '../../components/ui/logo';
import { GuestLayoutRoute } from '.';

const Navbar = () => {
	const { user: me } = GuestLayoutRoute.useRouteContext();

	return (
		<Flex align='center' justify='space-between' px='lg' h={60}>
			<Flex align='center' gap={16}>
				<Logo />
			</Flex>
			<Flex align='center' gap={16}>
				<ColorSchemaSwitcher />
				{!me && (
					<>
						<Button variant='filled' component={Link} to='/sign-in'>
							Se connecter
						</Button>
						<Button variant='outline' component={Link} to='/sign-up'>
							S'inscrire
						</Button>
					</>
				)}
				{me && (
					<Button component={Link} to='/dashboard'>
						Revient au tableau de bord
					</Button>
				)}
			</Flex>
		</Flex>
	);
};

export { Navbar };

import { Divider, Flex } from '@mantine/core';
import { Outlet, createRoute } from '@tanstack/react-router';
import { Navbar } from './navbar';
import { RootLayoutRoute } from '../root-layout';

const GuestLayout = () => {
	return (
		<Flex direction='column' h='100vh' style={{ overflowY: 'hidden' }}>
			<Navbar />
			<Divider />
			<div style={{ flex: 1 }}>
				<Outlet />
			</div>
		</Flex>
	);
};

const GuestLayoutRoute = createRoute({
	id: 'guest-layout',
	getParentRoute: () => RootLayoutRoute,
	component: GuestLayout,
});

export { GuestLayoutRoute };

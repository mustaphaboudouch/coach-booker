import { AppShell, Container } from '@mantine/core';
import { Navbar } from './navbar';
import { Outlet, createRoute } from '@tanstack/react-router';
import { RootLayoutRoute } from '../root-layout';

const AuthLayout = () => {
	return (
		<AppShell header={{ height: 60 }}>
			<AppShell.Header>
				<Navbar />
			</AppShell.Header>
			<AppShell.Main>
				<Container size='xs' py='3rem'>
					<Outlet />
				</Container>
			</AppShell.Main>
		</AppShell>
	);
};

const AuthLayoutRoute = createRoute({
	id: 'auth-layout',
	getParentRoute: () => RootLayoutRoute,
	component: AuthLayout,
});

export { AuthLayoutRoute };

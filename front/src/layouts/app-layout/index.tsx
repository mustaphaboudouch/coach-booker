import { AppShell, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet, createRoute } from '@tanstack/react-router';
import { Navbar } from './navbar';
import { Sidebar } from './sidebar';
import { RootLayoutRoute } from '../root-layout';

const AppLayout = () => {
	const [opened, { toggle }] = useDisclosure();

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
		>
			<AppShell.Header>
				<Navbar isOpen={opened} onToggle={toggle} />
			</AppShell.Header>
			<AppShell.Navbar py='lg' style={{ overflowY: 'auto' }}>
				<Sidebar />
			</AppShell.Navbar>
			<AppShell.Main>
				<Container py='xl'>
					<Outlet />
				</Container>
			</AppShell.Main>
		</AppShell>
	);
};

const AppLayoutRoute = createRoute({
	id: 'app-layout',
	getParentRoute: () => RootLayoutRoute,
	component: AppLayout,
});

export { AppLayoutRoute };

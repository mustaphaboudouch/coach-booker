import { AppShell, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Navbar } from './navbar';
import { Sidebar } from './sidebar';
import { Header } from './header';

type AppLayoutProps = {
	title: string;
	children: React.ReactNode;
};

export const AppLayout = ({ title, children }: AppLayoutProps) => {
	const [opened, { toggle }] = useDisclosure();

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
		>
			<AppShell.Header>
				<Navbar isOpen={opened} onToggle={toggle} />
			</AppShell.Header>
			<AppShell.Navbar p='md' style={{ overflowY: 'auto' }}>
				<Sidebar />
			</AppShell.Navbar>
			<AppShell.Main>
				<Container py='xl'>
					<Header title={title} />
					{children}
				</Container>
			</AppShell.Main>
		</AppShell>
	);
};

import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Navbar } from './navbar';
import { Sidebar } from './sidebar';

type AppLayoutProps = {
	children: React.ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
	const [opened, { toggle }] = useDisclosure();

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
			padding='md'
		>
			<AppShell.Header>
				<Navbar isOpen={opened} onToggle={toggle} />
			</AppShell.Header>
			<AppShell.Navbar p='md' style={{ overflowY: 'auto' }}>
				<Sidebar />
			</AppShell.Navbar>
			<AppShell.Main>{children}</AppShell.Main>
		</AppShell>
	);
};

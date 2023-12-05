import { AppShell, Container } from '@mantine/core';
import { Navbar } from './navbar';
import { Header } from './header';

type AppLayoutProps = {
	title: string;
	children: React.ReactNode;
};

export const AuthLayout = ({ title, children }: AppLayoutProps) => {
	return (
		<AppShell header={{ height: 60 }}>
			<AppShell.Header>
				<Navbar />
			</AppShell.Header>
			<AppShell.Main>
				<Container size='xs' py='3rem'>
					<Header title={title} />
					{children}
				</Container>
			</AppShell.Main>
		</AppShell>
	);
};

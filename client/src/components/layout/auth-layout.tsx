import { AppShell, Container } from '@mantine/core';
import { AuthNavbar } from './auth-navbar';

type AppLayoutProps = {
	children: React.ReactNode;
};

export const AuthLayout = ({ children }: AppLayoutProps) => {
	return (
		<AppShell header={{ height: 60 }}>
			<AppShell.Header>
				<AuthNavbar />
			</AppShell.Header>
			<AppShell.Main>
				<Container size='xs' py='3rem'>
					{children}
				</Container>
			</AppShell.Main>
		</AppShell>
	);
};

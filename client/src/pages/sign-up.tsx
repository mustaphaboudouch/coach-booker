import { Button, Stack, Title } from '@mantine/core';
import { AuthLayout } from '../components/layout/auth-layout';
import { IconBarbell, IconStretching } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export const SignUp = () => {
	return (
		<AuthLayout>
			<Title order={1} size='2rem' mb='lg'>
				S'inscrire
			</Title>

			<Stack>
				<Button
					variant='filled'
					size='md'
					component={Link}
					to='/sign-up-coach'
					leftSection={<IconBarbell size='1.5rem' />}
				>
					Je suis un coach
				</Button>
				<Button
					variant='filled'
					size='md'
					component={Link}
					to='/sign-up-client'
					leftSection={<IconStretching size='1.5rem' />}
				>
					Je suis un client
				</Button>
			</Stack>
		</AuthLayout>
	);
};

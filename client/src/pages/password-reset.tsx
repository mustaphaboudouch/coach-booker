import { Button, PasswordInput, Stack, Title } from '@mantine/core';
import { AuthLayout } from '../components/layout/auth-layout';
import { IconLock } from '@tabler/icons-react';

export const PasswordReset = () => {
	return (
		<AuthLayout>
			<Title order={1} size='2rem' mb='lg'>
				Réinitialiser le mot de passe
			</Title>

			<Stack>
				<PasswordInput
					label='Mot de passe'
					placeholder='Mot de passe'
					leftSection={<IconLock size='1rem' />}
				/>
				<PasswordInput
					label='Confirmer le mot de passe'
					placeholder='Mot de passe'
					leftSection={<IconLock size='1rem' />}
				/>
				<Button mt='xs'>Réinitialiser</Button>
			</Stack>
		</AuthLayout>
	);
};

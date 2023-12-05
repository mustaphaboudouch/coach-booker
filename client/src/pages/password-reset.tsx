import { Button, PasswordInput, Stack } from '@mantine/core';
import { AuthLayout } from '../components/layout';
import { IconLock } from '@tabler/icons-react';

export const PasswordReset = () => {
	return (
		<AuthLayout title='Réinitialiser le mot de passe'>
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

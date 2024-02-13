import { Button, PasswordInput, Stack } from '@mantine/core';
import { IconLock } from '@tabler/icons-react';
import { AuthLayoutRoute } from '../../layouts/auth-layout';
import { createRoute } from '@tanstack/react-router';
import { PageHeader } from '../../components/page-header';

const PasswordReset = () => {
	return (
		<Stack>
			<PageHeader title='Réinitialiser le mot de passe' />

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
	);
};

const PasswordResetRoute = createRoute({
	getParentRoute: () => AuthLayoutRoute,
	path: '/password-reset',
	component: PasswordReset,
});

export { PasswordResetRoute };

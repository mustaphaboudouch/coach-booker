import { Button, Stack, Text, TextInput } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import { AuthLayoutRoute } from '../../layouts/auth-layout';
import { createRoute } from '@tanstack/react-router';
import { PageHeader } from '../../components/page-header';

const PasswordForget = () => {
	return (
		<>
			<PageHeader title='Mot de passe oublié' />

			<Text size='sm' mb='lg'>
				Entrez votre adresse e-mail et nous vous enverrons un lien pour
				réinitialiser votre mot de passe.
			</Text>

			<Stack>
				<TextInput
					type='email'
					label='Adresse e-mail'
					placeholder='Adresse e-mail'
					leftSection={<IconAt size='1rem' />}
				/>
				<Button mt='xs'>Envoyer</Button>
			</Stack>
		</>
	);
};

const PasswordForgetRoute = createRoute({
	getParentRoute: () => AuthLayoutRoute,
	path: '/password-forget',
	component: PasswordForget,
});

export { PasswordForgetRoute };

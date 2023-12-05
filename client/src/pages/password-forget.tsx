import { Button, Stack, Text, TextInput } from '@mantine/core';
import { AuthLayout } from '../components/layout';
import { IconAt } from '@tabler/icons-react';

export const PasswordForget = () => {
	return (
		<AuthLayout title='Mot de passe oublié ?'>
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
		</AuthLayout>
	);
};

import { Button, Input, Stack, Text, Title } from '@mantine/core';
import { AuthLayout } from '../components/layout/auth-layout';
import { IconAt } from '@tabler/icons-react';

export const PasswordForget = () => {
	return (
		<AuthLayout>
			<Title order={1} size='2rem' mb='lg'>
				Mot de passe oublié ?
			</Title>

			<Text size='sm' mb='lg'>
				Entrez votre adresse e-mail et nous vous enverrons un lien pour
				réinitialiser votre mot de passe.
			</Text>

			<Stack>
				<Input.Wrapper label='Adresse e-mail'>
					<Input
						placeholder='Adresse e-mail'
						leftSection={<IconAt size='1rem' />}
					/>
				</Input.Wrapper>
				<Button mt='xs'>Envoyer</Button>
			</Stack>
		</AuthLayout>
	);
};

import { Button, Stack, Text, TextInput } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import { AuthLayoutRoute } from '../../layouts/auth-layout';
import { createRoute } from '@tanstack/react-router';
import { PageHeader } from '../../components/page-header';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

const schema = z.object({
	email: z.string().email(),
});

const PasswordForget = () => {
	const form = useForm({
		initialValues: {
			email: '',
		},
		validate: zodResolver(schema),
	});

	const onSave = () => {
		const validation = form.validate();
		if (!validation.hasErrors) {
			console.log('VALUES :', form.values);
		}
	};

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
					{...form.getInputProps('email')}
				/>
				<Button mt='xs' onClick={onSave}>
					Envoyer
				</Button>
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

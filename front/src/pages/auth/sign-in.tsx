import { IconAt, IconLock } from '@tabler/icons-react';
import { Anchor, Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import { Link, createRoute } from '@tanstack/react-router';
import { AuthLayoutRoute } from '../../layouts/auth-layout';
import { PageHeader } from '../../components/ui/page-header';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

const SignIn = () => {
	const form = useForm({
		initialValues: {
			email: '',
			password: '',
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
		<Stack>
			<PageHeader title='Se connecter' />

			<TextInput
				type='email'
				label='Adresse e-mail'
				placeholder='Adresse e-mail'
				leftSection={<IconAt size='1rem' />}
				{...form.getInputProps('email')}
			/>
			<PasswordInput
				label='Mot de passe'
				placeholder='Mot de passe'
				leftSection={<IconLock size='1rem' />}
				{...form.getInputProps('password')}
			/>
			<Button mt='xs' onClick={onSave}>
				Se connecter
			</Button>
			<Anchor
				component={Link}
				preload={false}
				to='/sign-up'
				underline='always'
				size='sm'
				style={{ textAlign: 'center' }}
			>
				Créer un nouveau compte
			</Anchor>
		</Stack>
	);
};

const SignInRoute = createRoute({
	getParentRoute: () => AuthLayoutRoute,
	path: '/sign-in',
	component: SignIn,
});

export { SignInRoute };

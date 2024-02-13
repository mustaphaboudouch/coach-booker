import { Button, PasswordInput, Stack } from '@mantine/core';
import { IconLock } from '@tabler/icons-react';
import { AuthLayoutRoute } from '../../layouts/auth-layout';
import { createRoute } from '@tanstack/react-router';
import { PageHeader } from '../../components/page-header';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

const schema = z
	.object({
		password: z.string().min(6),
		passwordConfirm: z.string().min(6),
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: 'Les mots de passe ne correspondent pas',
		path: ['passwordConfirm'],
	});

const PasswordReset = () => {
	const form = useForm({
		initialValues: {
			password: '',
			passwordConfirm: '',
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
			<PageHeader title='Réinitialiser le mot de passe' />

			<PasswordInput
				label='Mot de passe'
				placeholder='Mot de passe'
				leftSection={<IconLock size='1rem' />}
				{...form.getInputProps('password')}
			/>
			<PasswordInput
				label='Confirmer le mot de passe'
				placeholder='Mot de passe'
				leftSection={<IconLock size='1rem' />}
				{...form.getInputProps('passwordConfirm')}
			/>
			<Button mt='xs' onClick={onSave}>
				Réinitialiser
			</Button>
		</Stack>
	);
};

const PasswordResetRoute = createRoute({
	getParentRoute: () => AuthLayoutRoute,
	path: '/password-reset',
	component: PasswordReset,
});

export { PasswordResetRoute };

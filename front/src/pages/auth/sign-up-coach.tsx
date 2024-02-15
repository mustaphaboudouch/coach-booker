import {
	Anchor,
	Button,
	Group,
	PasswordInput,
	Stack,
	TextInput,
} from '@mantine/core';
import { IconAt, IconLock } from '@tabler/icons-react';
import { Link, createRoute, useNavigate } from '@tanstack/react-router';
import { AuthLayoutRoute } from '../../layouts/auth-layout';
import { PageHeader } from '../../components/ui/page-header';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { USER_ROLES } from '../../constants/user';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const schema = z
	.object({
		firstname: z.string().min(1),
		lastname: z.string().min(1),
		email: z.string().email(),
		plainPassword: z.string().min(6),
		passwordConfirm: z.string().min(6),
		organisation: z.object({
			name: z.string().min(1),
			kbis: z.string().min(1),
		}),
	})
	.refine((data) => data.plainPassword === data.passwordConfirm, {
		message: 'Les mots de passe ne correspondent pas',
		path: ['passwordConfirm'],
	});

const SignUpCoach = () => {
	const navigate = useNavigate();
	const form = useForm({
		initialValues: {
			firstname: '',
			lastname: '',
			email: '',
			plainPassword: '',
			passwordConfirm: '',
			organisation: {
				name: '',
				kbis: '',
			},
		},
		validate: zodResolver(schema),
	});

	const mutation = useMutation({
		mutationFn: (data: unknown) => {
			return axios.post('http://127.0.0.1:8000/api/users', data);
		},
		onError: (error) => {
			console.error(error);
		},
		onSuccess: () => {
			navigate({ to: '/sign-in' });
		},
	});

	const onSave = () => {
		const validation = form.validate();
		if (!validation.hasErrors) {
			mutation.mutate({ ...form.values, roles: [USER_ROLES.ROLE_ORG_ADMIN] });
		}
	};

	return (
		<Stack>
			<PageHeader title="S'inscrire en tant que coach" />

			<Group grow>
				<TextInput
					label="Nom de l'organisation"
					placeholder="Nom de l'organisation"
					{...form.getInputProps('organisation.name')}
				/>
				<TextInput
					label='KBIS'
					placeholder='KBIS'
					{...form.getInputProps('organisation.kbis')}
				/>
			</Group>
			<Group grow>
				<TextInput
					label='Prénom'
					placeholder='Prénom'
					{...form.getInputProps('firstname')}
				/>
				<TextInput
					label='Nom'
					placeholder='Nom'
					{...form.getInputProps('lastname')}
				/>
			</Group>
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
				{...form.getInputProps('plainPassword')}
			/>
			<PasswordInput
				label='Confirmer le mot de passe'
				placeholder='Confirmer le mot de passe'
				leftSection={<IconLock size='1rem' />}
				{...form.getInputProps('passwordConfirm')}
			/>
			<Button mt='xs' onClick={onSave} loading={mutation.isPending}>
				S'inscrire
			</Button>
			<Anchor
				component={Link}
				preload={false}
				to='/sign-in'
				underline='always'
				size='sm'
				style={{ textAlign: 'center' }}
			>
				J'ai déjà un compte
			</Anchor>
		</Stack>
	);
};

const SignUpCoachRoute = createRoute({
	getParentRoute: () => AuthLayoutRoute,
	path: '/sign-up/coach',
	component: SignUpCoach,
});

export { SignUpCoachRoute };

import { IconAt, IconLock } from '@tabler/icons-react';
import { Anchor, Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import {
	Link,
	createRoute,
	redirect,
	useNavigate,
} from '@tanstack/react-router';
import { AuthLayoutRoute } from '../../layouts/auth-layout';
import { PageHeader } from '../../components/ui/page-header';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useLocalStorage } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

const SignIn = () => {
	const [, setValue] = useLocalStorage({
		key: 'jwt-token',
	});

	const navigate = useNavigate();
	const form = useForm({
		initialValues: {
			email: '',
			password: '',
		},
		validate: zodResolver(schema),
	});

	const { queryClient } = SignInRoute.useRouteContext();
	const mutation = useMutation({
		mutationFn: (data: unknown) => {
			return axios.post('https://pure-wave-60095-4115169081f3.herokuapp.com/sign-in', data);
		},
		onError: (error) => {
			console.error(error);
			notifications.show({
				title: 'Oooops! 🤯',
				message: error.message,
			});
		},
		onSuccess: (value) => {
			setValue(value.data.token);
			queryClient.invalidateQueries({ queryKey: ['me'] });
			navigate({ to: '/dashboard' });
			window.location.reload();
		},
	});

	const onSave = () => {
		const validation = form.validate();
		if (!validation.hasErrors) {
			mutation.mutate(form.values);
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
			<Button mt='xs' onClick={onSave} loading={mutation.isPending}>
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
	beforeLoad: ({ context }) => {
		if (context.user) {
			throw redirect({
				to: '/dashboard',
			});
		}
	},
});

export { SignInRoute };

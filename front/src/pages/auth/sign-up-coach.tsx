import {
	Anchor,
	Button,
	Group,
	PasswordInput,
	Stack,
	TextInput,
} from '@mantine/core';
import { IconAt, IconLock } from '@tabler/icons-react';
import { Link, createRoute } from '@tanstack/react-router';
import { AuthLayoutRoute } from '../../layouts/auth-layout';
import { PageHeader } from '../../components/page-header';

const SignUpCoach = () => {
	return (
		<Stack>
			<PageHeader title="S'inscrire en tant que coach" />

			<Group grow>
				<TextInput label='Prénom' placeholder='Prénom' />
				<TextInput label='Nom' placeholder='Nom' />
			</Group>
			<TextInput
				type='email'
				label='Adresse e-mail'
				placeholder='Adresse e-mail'
				leftSection={<IconAt size='1rem' />}
			/>
			<PasswordInput
				label='Mot de passe'
				placeholder='Mot de passe'
				leftSection={<IconLock size='1rem' />}
			/>
			<Button mt='xs'>S'inscrire</Button>
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

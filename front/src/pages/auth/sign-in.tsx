import { IconAt, IconLock } from '@tabler/icons-react';
import { Anchor, Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import { Link, createRoute } from '@tanstack/react-router';
import { AuthLayoutRoute } from '../../layouts/auth-layout';
import { PageHeader } from '../../components/page-header';

const SignIn = () => {
	return (
		<Stack>
			<PageHeader title='Se connecter' />

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
			<Anchor
				component={Link}
				preload={false}
				to='/password-forget'
				underline='always'
				size='sm'
				style={{ textAlign: 'right' }}
			>
				Mot de passe oublié ?
			</Anchor>
			<Button mt='xs'>Se connecter</Button>
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

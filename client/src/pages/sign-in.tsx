import { IconAt, IconLock } from '@tabler/icons-react';
import { AuthLayout } from '../components/layout';
import { Anchor, Button, Input, PasswordInput, Stack } from '@mantine/core';
import { Link } from 'react-router-dom';

export const SignIn = () => {
	return (
		<AuthLayout title='Se connecter'>
			<Stack>
				<Input.Wrapper label='Adresse e-mail'>
					<Input
						placeholder='Adresse e-mail'
						leftSection={<IconAt size='1rem' />}
					/>
				</Input.Wrapper>
				<PasswordInput
					label='Mot de passe'
					placeholder='Mot de passe'
					leftSection={<IconLock size='1rem' />}
				/>
				<Anchor
					component={Link}
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
					to='/sign-up'
					underline='always'
					size='sm'
					style={{ textAlign: 'center' }}
				>
					Créer un nouveau compte
				</Anchor>
			</Stack>
		</AuthLayout>
	);
};

import {
	Anchor,
	Button,
	Group,
	PasswordInput,
	Stack,
	TextInput,
} from '@mantine/core';
import { AuthLayout } from '../components/layout';
import { IconAt, IconLock } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export const SignUpClient = () => {
	return (
		<AuthLayout title="S'inscrire comme client">
			<Stack>
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
					to='/sign-in'
					underline='always'
					size='sm'
					style={{ textAlign: 'center' }}
				>
					J'ai déjà un compte
				</Anchor>
			</Stack>
		</AuthLayout>
	);
};

import {
	Anchor,
	Button,
	Group,
	Input,
	PasswordInput,
	Stack,
	Title,
} from '@mantine/core';
import { AuthLayout } from '../components/layout/auth-layout';
import { IconAt, IconLock } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export const SignUpClient = () => {
	return (
		<AuthLayout>
			<Title order={1} size='2rem' mb='lg'>
				S'inscrire comme client
			</Title>

			<Stack>
				<Group grow>
					<Input.Wrapper label='Prénom'>
						<Input placeholder='Prénom' />
					</Input.Wrapper>
					<Input.Wrapper label='Nom'>
						<Input placeholder='Nom' />
					</Input.Wrapper>
				</Group>
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

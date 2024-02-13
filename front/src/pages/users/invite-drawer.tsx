import {
	Button,
	Drawer,
	Flex,
	Group,
	PasswordInput,
	Radio,
	Stack,
	TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconSend } from '@tabler/icons-react';
import { z } from 'zod';

const schema = z
	.object({
		role: z.enum(['ROLE_ORG_ADMIN', 'ROLE_ORG_COACH']),
		firstname: z.string().min(1),
		lastname: z.string().min(1),
		email: z.string().email(),
		password: z.string().min(6),
		passwordConfirm: z.string().min(6),
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: 'Les mots de passe ne correspondent pas',
		path: ['passwordConfirm'],
	});

const InviteDrawer = () => {
	const [opened, { open, close }] = useDisclosure(false);
	const form = useForm({
		initialValues: {
			role: '',
			firstname: '',
			lastname: '',
			email: '',
			password: '',
			passwordConfirm: '',
		},
		validate: zodResolver(schema),
	});

	const onInvite = () => {
		const validation = form.validate();
		if (!validation.hasErrors) {
			console.log('VALUES :', form.values);
		}
	};

	return (
		<>
			<Drawer
				position='right'
				opened={opened}
				onClose={close}
				title='Inviter un employé'
			>
				<Stack gap='sm'>
					<Radio.Group
						label='Inviter en tant que'
						withAsterisk
						{...form.getInputProps('role')}
					>
						<Group mt='xs'>
							<Radio value='ROLE_ORG_ADMIN' label='Manager' />
							<Radio value='ROLE_ORG_COACH' label='Coach' />
						</Group>
					</Radio.Group>
					<TextInput
						label='Prénom'
						placeholder='Prénom'
						withAsterisk
						{...form.getInputProps('firstname')}
					/>
					<TextInput
						label='Nom'
						placeholder='Nom'
						withAsterisk
						{...form.getInputProps('lastname')}
					/>
					<TextInput
						label='Adresse e-mail'
						placeholder='Nom'
						withAsterisk
						{...form.getInputProps('email')}
					/>
					<PasswordInput
						label='Mot de passe'
						placeholder='Mot de passe'
						withAsterisk
						{...form.getInputProps('password')}
					/>
					<PasswordInput
						label='Confirmer le mot de passe'
						placeholder='Mot de passe'
						withAsterisk
						{...form.getInputProps('passwordConfirm')}
					/>
					<Flex gap='sm' justify='flex-end' mt='md'>
						<Button variant='default' onClick={close}>
							Annuler
						</Button>
						<Button onClick={onInvite}>Inviter</Button>
					</Flex>
				</Stack>
			</Drawer>

			<Button leftSection={<IconSend size='1rem' />} onClick={open}>
				Inviter un employé
			</Button>
		</>
	);
};

export { InviteDrawer };

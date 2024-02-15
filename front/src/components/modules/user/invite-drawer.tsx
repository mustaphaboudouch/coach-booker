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
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { UsersRoute } from '../../../pages/users';
import axios from 'axios';

const schema = z
	.object({
		roles: z.enum(['ROLE_ORG_ADMIN', 'ROLE_ORG_COACH']),
		firstname: z.string().min(1),
		lastname: z.string().min(1),
		email: z.string().email(),
		plainPassword: z.string().min(6),
		passwordConfirm: z.string().min(6),
	})
	.refine((data) => data.plainPassword === data.passwordConfirm, {
		message: 'Les mots de passe ne correspondent pas',
		path: ['passwordConfirm'],
	});

const InviteDrawer = () => {
	const [opened, { open, close }] = useDisclosure(false);
	const form = useForm({
		initialValues: {
			roles: '',
			firstname: '',
			lastname: '',
			email: '',
			plainPassword: '',
			passwordConfirm: '',
		},
		validate: zodResolver(schema),
	});

	const { queryClient } = UsersRoute.useRouteContext();
	const mutation = useMutation({
		mutationFn: (data: unknown) => {
			return axios.post('https://pure-wave-60095-4115169081f3.herokuapp.com/api/users', data);
		},
		onError: (error) => {
			console.error(error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] });
			close();
		},
	});

	const onInvite = () => {
		const validation = form.validate();
		if (!validation.hasErrors) {
			mutation.mutate({ ...form.values, roles: [form.values.roles] });
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
						{...form.getInputProps('roles')}
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
						{...form.getInputProps('plainPassword')}
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
						<Button onClick={onInvite} loading={mutation.isPending}>
							Inviter
						</Button>
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

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
import { useDisclosure } from '@mantine/hooks';
import { IconSend } from '@tabler/icons-react';

const InviteDrawer = () => {
	const [opened, { open, close }] = useDisclosure(false);

	const onInvite = () => {
		console.log('INVITE');
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
					<Radio.Group label='Inviter en tant que' withAsterisk>
						<Group mt='xs'>
							<Radio value='ROLE_ORG_ADMIN' label='Manager' />
							<Radio value='ROLE_ORG_COACH' label='Coach' />
						</Group>
					</Radio.Group>
					<TextInput
						label='Prénom'
						placeholder="Prénom de l'utilisateur"
						withAsterisk
					/>
					<TextInput
						label='Nom'
						placeholder="Nom de l'utilisateur"
						withAsterisk
					/>
					<TextInput
						label='Adresse e-mail'
						placeholder="Nom de l'utilisateur"
						withAsterisk
					/>
					<PasswordInput
						label='Mot de passe'
						placeholder="Mot de passe de l'utilisateur"
						withAsterisk
					/>
					<PasswordInput
						label='Confirmer le mot de passe'
						placeholder="Mot de passe de l'utilisateur"
						withAsterisk
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

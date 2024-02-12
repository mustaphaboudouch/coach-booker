import {
	ActionIcon,
	Button,
	Drawer,
	Flex,
	Group,
	Stack,
	TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';

const EditDrawer = () => {
	const [opened, { open, close }] = useDisclosure(false);

	const onSave = () => {
		console.log('SAVE');
	};

	return (
		<>
			<Drawer
				position='right'
				opened={opened}
				onClose={close}
				title="Modifier l'utilisateur"
			>
				<Stack gap='sm'>
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
						label='Numéro de téléphone'
						placeholder="Numéro de téléphone de l'utilisateur"
					/>
					<Group grow>
						<TextInput
							label='Pays'
							placeholder="Pays de l'utilisateur"
							withAsterisk
						/>
						<TextInput
							label='Ville'
							placeholder="Ville de l'utilisateur"
							withAsterisk
						/>
					</Group>
					<TextInput
						label='Code postal'
						placeholder="Code postal de l'utilisateur"
						withAsterisk
					/>
					<TextInput
						label='Adresse'
						placeholder="Adresse de l'utilisateur"
						withAsterisk
					/>
					<Flex gap='sm' justify='flex-end' mt='md'>
						<Button variant='default' onClick={close}>
							Annuler
						</Button>
						<Button onClick={onSave}>Enregistrer</Button>
					</Flex>
				</Stack>
			</Drawer>

			<ActionIcon variant='default' size='md' aria-label='Edit' onClick={open}>
				<IconEdit size='1rem' />
			</ActionIcon>
		</>
	);
};

export { EditDrawer };

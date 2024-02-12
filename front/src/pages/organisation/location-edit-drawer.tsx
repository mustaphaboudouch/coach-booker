import {
	ActionIcon,
	Button,
	Drawer,
	Flex,
	Group,
	Stack,
	TextInput,
	Textarea,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';

const LocationEditDrawer = () => {
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
				title='Modifier le local'
			>
				<Stack gap='sm'>
					<TextInput label='Nom' placeholder='Nom' withAsterisk />
					<Textarea
						label='Description'
						placeholder='Description'
						rows={5}
						withAsterisk
					/>
					<Group grow>
						<TextInput label='Pays' placeholder='Pays' withAsterisk />
						<TextInput label='Ville' placeholder='Ville' withAsterisk />
					</Group>
					<TextInput
						label='Code postal'
						placeholder='Code postal'
						withAsterisk
					/>
					<TextInput label='Adresse' placeholder='Adresse' withAsterisk />
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

export { LocationEditDrawer };

import {
	ActionIcon,
	Button,
	Drawer,
	Flex,
	NumberInput,
	Stack,
	TextInput,
	Textarea,
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
					<TextInput label='Nom' placeholder='Nom du service' withAsterisk />
					<NumberInput
						label='Durée (min)'
						placeholder='Durée du service'
						withAsterisk
					/>
					<NumberInput
						label='Prix (€)'
						placeholder='Prix du service'
						withAsterisk
					/>
					<Textarea
						label='Description'
						placeholder='Description du service'
						rows={5}
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

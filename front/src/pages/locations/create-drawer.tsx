import {
	Button,
	Drawer,
	Flex,
	Group,
	Stack,
	TextInput,
	Textarea,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';

const CreateDrawer = () => {
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
				title='Ajouter un local'
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
						<Button onClick={onSave}>Enregister</Button>
					</Flex>
				</Stack>
			</Drawer>

			<Button leftSection={<IconPlus size='1rem' />} onClick={open}>
				Ajouter un local
			</Button>
		</>
	);
};

export { CreateDrawer };

import {
	Button,
	Drawer,
	Flex,
	NumberInput,
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
				title='Créer un service'
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
						<Button onClick={onSave}>Enregister</Button>
					</Flex>
				</Stack>
			</Drawer>

			<Button leftSection={<IconPlus size='1rem' />} onClick={open}>
				Créer un service
			</Button>
		</>
	);
};

export { CreateDrawer };

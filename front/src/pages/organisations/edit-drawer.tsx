import {
	ActionIcon,
	Button,
	Drawer,
	Flex,
	Stack,
	TextInput,
	Textarea,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import { z } from 'zod';

const schema = z.object({
	name: z.string().min(1),
	kbis: z.string().min(1),
	description: z.string().nullish(),
});

const EditDrawer = () => {
	const [opened, { open, close }] = useDisclosure(false);
	const form = useForm({
		initialValues: {
			name: '',
			kbis: '',
			description: undefined,
		},
		validate: zodResolver(schema),
	});

	const onSave = () => {
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
				title="Modifier l'organisation"
				{...form.getInputProps('firstname')}
			>
				<Stack gap='sm'>
					<TextInput
						label='Nom'
						placeholder='Nom'
						{...form.getInputProps('name')}
						withAsterisk
					/>
					<TextInput
						label='KBIS'
						placeholder='KBIS'
						{...form.getInputProps('kbis')}
						withAsterisk
					/>
					<Textarea
						label='Description'
						placeholder='Description'
						{...form.getInputProps('description')}
						rows={5}
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

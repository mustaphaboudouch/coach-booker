import {
	Button,
	Drawer,
	Flex,
	NumberInput,
	Stack,
	TextInput,
	Textarea,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { z } from 'zod';

const schema = z.object({
	name: z.string().min(1),
	duration: z.number().int().min(15),
	price: z.number().int().min(0),
	description: z.string().min(1),
});

const CreateDrawer = () => {
	const [opened, { open, close }] = useDisclosure(false);
	const form = useForm({
		initialValues: {
			name: '',
			duration: 15,
			price: 0,
			description: '',
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
				title='Créer un service'
			>
				<Stack gap='sm'>
					<TextInput
						label='Nom'
						placeholder='Nom'
						withAsterisk
						{...form.getInputProps('name')}
					/>
					<NumberInput
						label='Durée (min)'
						placeholder='Durée'
						withAsterisk
						{...form.getInputProps('duration')}
					/>
					<NumberInput
						label='Prix (€)'
						placeholder='Prix'
						withAsterisk
						{...form.getInputProps('price')}
					/>
					<Textarea
						label='Description'
						placeholder='Description'
						rows={5}
						withAsterisk
						{...form.getInputProps('description')}
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

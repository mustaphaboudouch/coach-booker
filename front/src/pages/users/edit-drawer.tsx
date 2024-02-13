import {
	ActionIcon,
	Button,
	Drawer,
	Flex,
	Group,
	Stack,
	TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import { z } from 'zod';

const schema = z.object({
	firstname: z.string().min(1),
	lastname: z.string().min(1),
	phoneNumber: z.string().nullish(),
	address: z.object({
		country: z.string().min(1),
		city: z.string().min(1),
		zipCode: z.string().min(1),
		address: z.string().min(1),
	}),
});

const EditDrawer = () => {
	const [opened, { open, close }] = useDisclosure(false);
	const form = useForm({
		initialValues: {
			firstname: '',
			lastname: '',
			phoneNumber: undefined,
			address: {
				country: '',
				city: '',
				zipCode: '',
				address: '',
			},
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
				title="Modifier l'utilisateur"
			>
				<Stack gap='sm'>
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
						label='Numéro de téléphone'
						placeholder='Numéro de téléphone'
						{...form.getInputProps('phoneNumber')}
					/>
					<Group grow>
						<TextInput
							label='Pays'
							placeholder='Pays'
							withAsterisk
							{...form.getInputProps('address.country')}
						/>
						<TextInput
							label='Ville'
							placeholder='Ville'
							withAsterisk
							{...form.getInputProps('address.city')}
						/>
					</Group>
					<TextInput
						label='Code postal'
						placeholder='Code postal'
						withAsterisk
						{...form.getInputProps('address.zipCode')}
					/>
					<TextInput
						label='Adresse'
						placeholder='Adresse'
						withAsterisk
						{...form.getInputProps('address.address')}
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

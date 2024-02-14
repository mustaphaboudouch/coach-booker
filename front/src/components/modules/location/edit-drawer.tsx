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
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import { z } from 'zod';
import { LocationsRoute } from '../../../pages/locations';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type Address = {
	country: string;
	city: string;
	zipCode: string;
	address: string;
};

type Location = {
	id: string;
	name: string;
	description: string;
	address: Address;
};

type EditDrawerProps = {
	location: Location;
};

const schema = z.object({
	name: z.string().min(1),
	description: z.string().min(1),
	address: z.object({
		country: z.string().min(1),
		city: z.string().min(1),
		zipCode: z.string().min(1),
		address: z.string().min(1),
	}),
});

const EditDrawer = ({ location }: EditDrawerProps) => {
	const [opened, { open, close }] = useDisclosure(false);
	const form = useForm({
		initialValues: {
			name: location.name,
			description: location.description,
			address: {
				country: location.address.country,
				city: location.address.city,
				zipCode: location.address.zipCode,
				address: location.address.address,
			},
		},
		validate: zodResolver(schema),
	});

	const { queryClient } = LocationsRoute.useRouteContext();
	const mutation = useMutation({
		mutationFn: (data: unknown) => {
			return axios.patch(
				`http://127.0.0.1:8000/api/locations/${location.id}`,
				data,
			);
		},
		onError: (error) => {
			console.error(error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['locations'] });
			close();
		},
	});

	const onSave = () => {
		const validation = form.validate();
		if (!validation.hasErrors) {
			mutation.mutate(form.values);
		}
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
					<TextInput
						label='Nom'
						placeholder='Nom'
						withAsterisk
						{...form.getInputProps('name')}
					/>
					<Textarea
						label='Description'
						placeholder='Description'
						rows={5}
						withAsterisk
						{...form.getInputProps('description')}
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
						<Button onClick={onSave} loading={mutation.isPending}>
							Enregistrer
						</Button>
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

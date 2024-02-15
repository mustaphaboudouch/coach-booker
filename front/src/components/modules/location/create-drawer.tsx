import {
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
import { IconPlus } from '@tabler/icons-react';
import { z } from 'zod';
import { LocationsRoute } from '../../../pages/locations';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

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

const CreateDrawer = () => {
	const [opened, { open, close }] = useDisclosure(false);
	const form = useForm({
		initialValues: {
			name: '',
			description: '',
			address: {
				country: '',
				city: '',
				zipCode: '',
				address: '',
			},
		},
		validate: zodResolver(schema),
	});

	const { queryClient } = LocationsRoute.useRouteContext();
	const mutation = useMutation({
		mutationFn: (data: unknown) => {
			return axios.post('https://pure-wave-60095-4115169081f3.herokuapp.com/api/locations', data);
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
			mutation.mutate({
				...form.values,
				organisation: '/api/organisations/1',
			});
		}
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
							Enregister
						</Button>
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

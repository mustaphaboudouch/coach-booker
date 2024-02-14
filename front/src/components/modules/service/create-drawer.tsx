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
import { ServicesRoute } from '../../../pages/services';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

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

	const { queryClient } = ServicesRoute.useRouteContext();
	const mutation = useMutation({
		mutationFn: (data: unknown) => {
			return axios.post('http://127.0.0.1:8000/api/services', data);
		},
		onError: (error) => {
			console.error(error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['services'] });
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
						<Button onClick={onSave} loading={mutation.isPending}>
							Enregister
						</Button>
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

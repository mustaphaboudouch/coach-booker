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
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
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

type Service = {
	id: string;
	name: string;
	duration: number;
	price: number;
	description: string;
};

type EditDrawerProps = {
	service: Service;
};

const EditDrawer = ({ service }: EditDrawerProps) => {
	const [opened, { open, close }] = useDisclosure(false);
	const form = useForm({
		initialValues: {
			name: service.name,
			duration: service.duration,
			price: service.price,
			description: service.description,
		},
		validate: zodResolver(schema),
	});

	const { queryClient } = ServicesRoute.useRouteContext();
	const mutation = useMutation({
		mutationFn: (data: unknown) => {
			return axios.patch(
				`https://pure-wave-60095-4115169081f3.herokuapp.com//api/services/${service.id}`,
				data,
			);
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
			mutation.mutate(form.values);
		}
	};

	return (
		<>
			<Drawer
				position='right'
				opened={opened}
				onClose={close}
				title='Modifier le service'
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

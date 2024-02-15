import {
	ActionIcon,
	Button,
	Drawer,
	Flex,
	Loader,
	Select,
	Stack,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus, IconTrash, IconUsersPlus } from '@tabler/icons-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { LocationsRoute } from '../../../pages/locations';
import axios from 'axios';
import { ErrorComponent } from '@tanstack/react-router';

type Address = {
	country: string;
	city: string;
	zipCode: string;
	address: string;
};

type User = {
	id: string;
	firstname: string;
	lastname: string;
};

type Location = {
	id: string;
	name: string;
	description: string;
	address: Address;
	users: User[];
};

type UsersDrawerProps = {
	location: Location;
};

const schema = z.object({
	users: z.array(
		z.string().refine((value) => value !== '', { message: 'Required' }),
	),
});

const UsersDrawer = ({ location }: UsersDrawerProps) => {
	const [opened, { open, close }] = useDisclosure(false);
	const form = useForm({
		initialValues: {
			users: location.users.map((user) => user.id.toString()),
		},
		validate: zodResolver(schema),
	});

	const { data, error, isLoading } = useQuery({
		queryKey: ['users-basic'],
		queryFn: async () => {
			const { data } = await axios.get('https://pure-wave-60095-4115169081f3.herokuapp.com/api/users-basic');
			return data['hydra:member'];
		},
	});

	const { queryClient } = LocationsRoute.useRouteContext();
	const mutation = useMutation({
		mutationFn: (data: unknown) => {
			return axios.patch(
				`https://pure-wave-60095-4115169081f3.herokuapp.com/api/locations/${location.id}/users-update`,
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
			mutation.mutate({
				users: form.values.users.map((id) => `/api/users/${id}`),
			});
		}
	};

	if (isLoading) {
		return <Loader size='sm' />;
	}

	if (error) {
		return <ErrorComponent error={error} />;
	}

	const users = data.map((user: User) => ({
		value: user.id.toString(),
		label: `${user.firstname} ${user.lastname}`,
	}));

	return (
		<>
			<Drawer
				position='right'
				opened={opened}
				onClose={close}
				title='Gérer les employés du local'
			>
				<Stack gap='sm'>
					{form.values.users.map((_, index) => (
						<Flex key={index} align='flex-end' gap='md'>
							<Select
								flex={1}
								label={`Utilisateur ${index + 1}`}
								placeholder='Utilisateur'
								data={users}
								withAsterisk
								{...form.getInputProps(`users.${index}`)}
							/>
							<ActionIcon
								color='red'
								size='lg'
								mb={1}
								onClick={() => form.removeListItem('users', index)}
							>
								<IconTrash size='1rem' />
							</ActionIcon>
						</Flex>
					))}

					<Flex justify='flex-end' mt='md'>
						<Button
							variant='default'
							leftSection={<IconPlus size='1rem' />}
							size='xs'
							onClick={() => form.insertListItem('users', '')}
						>
							Ajouter
						</Button>
					</Flex>

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

			<ActionIcon
				variant='default'
				size='md'
				aria-label='Edit users'
				onClick={open}
			>
				<IconUsersPlus size='1rem' />
			</ActionIcon>
		</>
	);
};

export { UsersDrawer };

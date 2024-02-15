import { Button, Drawer, Flex, Select, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AvailabilitiesList } from './availabilities-list';
import { useState } from 'react';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { SearchSingleRoute } from '.';

type User = {
	id: string;
	firstname: string;
	lastname: string;
};

type BookingDrawerProps = {
	serviceId: string;
	locationId: string;
	users: User[];
};

const schema = z.object({
	time: z.string().min(1),
});

const BookingDrawer = ({
	serviceId,
	locationId,
	users,
}: BookingDrawerProps) => {
	const [opened, { open, close }] = useDisclosure(false);
	const [userId, setUserId] = useState<string | null>(null);
	const form = useForm({
		initialValues: {
			time: '',
		},
		validate: zodResolver(schema),
	});

	const { queryClient } = SearchSingleRoute.useRouteContext();
	const mutation = useMutation({
		mutationFn: (data: unknown) => {
			return axios.post('http://127.0.0.1:8000/api/appointments', data);
		},
		onError: (error) => {
			console.error(error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['appointments'] });
			close();
		},
	});

	const onConfirm = () => {
		const [date, startTime, endTime] = form.values.time.split('|');

		mutation.mutate({
			// TODO: Replace with logged user id
			client: `/api/users/${userId}`,
			coach: `/api/users/${userId}`,
			service: `/api/services/${serviceId}`,
			location: `/api/locations/${locationId}`,
			date,
			startTime,
			endTime,
		});
	};

	return (
		<>
			<Drawer position='right' opened={opened} onClose={close}>
				<Stack gap='sm'>
					<Select
						flex={1}
						label='Coach'
						placeholder='Coach'
						data={users.map((user) => ({
							label: `${user.firstname} ${user.lastname}`,
							value: user.id.toString(),
						}))}
						onChange={(value) => setUserId(value)}
						withAsterisk
					/>

					{userId && (
						<AvailabilitiesList
							serviceId={serviceId}
							userId={userId}
							form={form}
						/>
					)}

					<Flex gap='sm' justify='flex-end' mt='md'>
						<Button variant='default' onClick={close}>
							Annuler
						</Button>
						<Button onClick={onConfirm}>Confirmer</Button>
					</Flex>
				</Stack>
			</Drawer>

			<Button size='xs' onClick={open}>
				Choisir
			</Button>
		</>
	);
};

export { BookingDrawer };

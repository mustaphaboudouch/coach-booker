import { ErrorComponent, createRoute, redirect } from '@tanstack/react-router';
import { AppLayoutRoute } from '../../layouts/app-layout';
import { PageHeader } from '../../components/ui/page-header';
import { Group, Loader, Select, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { List } from '../../components/modules/appointment/list';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const Appointments = () => {
	const { data, error, isLoading } = useQuery({
		queryKey: ['appointments'],
		queryFn: async () => {
			const { data } = await axios.get(
				'http://127.0.0.1:8000/api/appointments',
			);
			return data['hydra:member'];
		},
	});

	if (isLoading) {
		return <Loader />;
	}

	if (error) {
		return <ErrorComponent error={error} />;
	}

	return (
		<div>
			<PageHeader title='Rendez-vous' />

			<Group mb='lg'>
				<Select
					placeholder='Trier par'
					data={[
						{ value: 'AZ', label: 'AZ' },
						{ value: 'ZA', label: 'ZA' },
					]}
				/>
				<TextInput
					type='search'
					placeholder='Recherche...'
					leftSection={<IconSearch size={16} />}
					flex={1}
				/>
				{/* Service */}
				{/* Date */}
				{/* Status */}
			</Group>

			<List appointments={data} />
		</div>
	);
};

const AppointmentsRoute = createRoute({
	getParentRoute: () => AppLayoutRoute,
	path: 'appointments',
	component: Appointments,
	beforeLoad: ({ context }) => {
		if (!context.user) {
			throw redirect({
				to: '/sign-in',
			});
		}
	},
});

export { AppointmentsRoute };

import { ErrorComponent, createRoute } from '@tanstack/react-router';
import { AppLayoutRoute } from '../../layouts/app-layout';
import { PageHeader } from '../../components/ui/page-header';
import { Group, Loader, Select, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { CreateDrawer } from '../../components/modules/day-off/create-drawer';
import { List } from '../../components/modules/day-off/list';

const DaysOff = () => {
	const { data, error, isLoading } = useQuery({
		queryKey: ['days_off'],
		queryFn: async () => {
			const { data } = await axios.get('http://127.0.0.1:8000/api/day_offs');
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
			<PageHeader title='Jours de congés' rightSection={<CreateDrawer />} />

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
			</Group>

			<List daysOff={data} />
		</div>
	);
};

const DaysOffRoute = createRoute({
	getParentRoute: () => AppLayoutRoute,
	path: 'days-off',
	component: DaysOff,
});

export { DaysOffRoute };

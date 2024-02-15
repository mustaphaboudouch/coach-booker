import { ErrorComponent, createRoute, redirect } from '@tanstack/react-router';
import { AppLayoutRoute } from '../../layouts/app-layout';
import { PageHeader } from '../../components/ui/page-header';
import { Group, Loader, Select, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { List } from '../../components/modules/service/list';
import { useQuery } from '@tanstack/react-query';
import { CreateDrawer } from '../../components/modules/service/create-drawer';
import axios from 'axios';

const Services = () => {
	const { data, error, isLoading } = useQuery({
		queryKey: ['services'],
		queryFn: async () => {
			const { data } = await axios.get('https://thawing-inlet-59198-145d5518a749.herokuapp.com//api/services');
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
			<PageHeader title='Services' rightSection={<CreateDrawer />} />

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

			<List services={data} />
		</div>
	);
};

const ServicesRoute = createRoute({
	getParentRoute: () => AppLayoutRoute,
	path: 'services',
	component: Services,
	beforeLoad: ({ context }) => {
		if (!context.user) {
			throw redirect({
				to: '/sign-in',
			});
		}
	},
});

export { ServicesRoute };

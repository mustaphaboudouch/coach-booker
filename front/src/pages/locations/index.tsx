import { ErrorComponent, createRoute, redirect } from '@tanstack/react-router';
import { AppLayoutRoute } from '../../layouts/app-layout';
import { PageHeader } from '../../components/ui/page-header';
import { Group, Loader, Select, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { List } from '../../components/modules/location/list';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CreateDrawer } from '../../components/modules/location/create-drawer';
import { USER_ROLES } from '../../constants/user';

const Locations = () => {
	const { data, error, isLoading } = useQuery({
		queryKey: ['locations'],
		queryFn: async () => {
			const { data } = await axios.get('https://pure-wave-60095-4115169081f3.herokuapp.com//api/locations');
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
			<PageHeader title='Locaux' rightSection={<CreateDrawer />} />

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

			<List locations={data} />
		</div>
	);
};

const LocationsRoute = createRoute({
	getParentRoute: () => AppLayoutRoute,
	path: 'locations',
	component: Locations,
	beforeLoad: ({ context }) => {
		if (
			!context.user ||
			(!!context.user &&
				![USER_ROLES.ROLE_ADMIN, USER_ROLES.ROLE_ORG_ADMIN].includes(
					context.user.role,
				))
		) {
			throw redirect({
				to: '/sign-in',
			});
		}
	},
});

export { LocationsRoute };

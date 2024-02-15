import { ErrorComponent, createRoute, redirect } from '@tanstack/react-router';
import { AppLayoutRoute } from '../../layouts/app-layout';
import { PageHeader } from '../../components/ui/page-header';
import { Group, Input, Loader, Select } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { List } from '../../components/modules/organisation/list';
import { USER_ROLES } from '../../constants/user';

const Organisations = () => {
	const { data, error, isLoading } = useQuery({
		queryKey: ['organisations'],
		queryFn: async () => {
			const { data } = await axios.get(
				'https://thawing-inlet-59198-145d5518a749.herokuapp.com//api/organisations',
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
			<PageHeader title='Organisations' />

			<Group mb='lg'>
				<Select
					placeholder='Trier par'
					data={[
						{ value: 'AZ', label: 'AZ' },
						{ value: 'ZA', label: 'ZA' },
					]}
				/>
				<Input
					type='search'
					placeholder='Recherche...'
					leftSection={<IconSearch size={16} />}
					flex={1}
				/>
			</Group>

			<List organisations={data} />
		</div>
	);
};

const OrganisationsRoute = createRoute({
	getParentRoute: () => AppLayoutRoute,
	path: 'organisations',
	component: Organisations,
	beforeLoad: ({ context }) => {
		if (
			!context.user ||
			(!!context.user && ![USER_ROLES.ROLE_ADMIN].includes(context.user.role))
		) {
			throw redirect({
				to: '/sign-in',
			});
		}
	},
});

export { OrganisationsRoute };

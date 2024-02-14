import { ErrorComponent, createRoute } from '@tanstack/react-router';
import { AppLayoutRoute } from '../../layouts/app-layout';
import { PageHeader } from '../../components/ui/page-header';
import { Group, Loader, Select, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { List } from '../../components/modules/user/list';
import { InviteDrawer } from '../../components/modules/user/invite-drawer';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Users = () => {
	const { data, error, isLoading } = useQuery({
		queryKey: ['users'],
		queryFn: async () => {
			const { data } = await axios.get('http://127.0.0.1:8000/api/users');
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
			<PageHeader title='Utilisateurs' rightSection={<InviteDrawer />} />

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

			<List users={data} />
		</div>
	);
};

const UsersRoute = createRoute({
	getParentRoute: () => AppLayoutRoute,
	path: 'users',
	component: Users,
});

export { UsersRoute };

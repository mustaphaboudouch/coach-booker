import { ErrorComponent, createRoute, redirect } from '@tanstack/react-router';
import { AppLayoutRoute } from '../../layouts/app-layout';
import { PageHeader } from '../../components/ui/page-header';
import { Group, Loader, Select, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { CreateDrawer } from '../../components/modules/day-off/create-drawer';
import { List } from '../../components/modules/day-off/list';
import { USER_ROLES } from '../../constants/user';

const DaysOff = () => {
	const { data, error, isLoading } = useQuery({
		queryKey: ['days_off'],
		queryFn: async () => {
			const { data } = await axios.get('https://pure-wave-60095-4115169081f3.herokuapp.com/api/day_offs');
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
	beforeLoad: ({ context }) => {
		if (
			!context.user ||
			(!!context.user &&
				![USER_ROLES.ROLE_ORG_ADMIN, USER_ROLES.ROLE_ORG_COACH].includes(
					context.user.role,
				))
		) {
			throw redirect({
				to: '/sign-in',
			});
		}
	},
});

export { DaysOffRoute };

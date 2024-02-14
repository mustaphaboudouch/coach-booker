import { createRoute } from '@tanstack/react-router';
import { PageHeader } from '../../components/ui/page-header';
import { AppLayoutRoute } from '../../layouts/app-layout';
import { Tabs } from '@mantine/core';
import { IconChartDonut, IconMap } from '@tabler/icons-react';
import { DashboardTab } from './dashboard-tab';
import { LocationsTab } from './locations-tab';

const Organisation = () => {
	// const { organisationId } = OrganisationRoute.useParams();

	return (
		<div>
			<PageHeader title='Organisation' />

			<Tabs defaultValue='dashboard'>
				<Tabs.List>
					<Tabs.Tab
						value='dashboard'
						leftSection={<IconChartDonut size='1rem' />}
					>
						Tableau de bord
					</Tabs.Tab>
					<Tabs.Tab value='locations' leftSection={<IconMap size='1rem' />}>
						Locaux
					</Tabs.Tab>
				</Tabs.List>

				<DashboardTab />
				<LocationsTab />
			</Tabs>
		</div>
	);
};

const OrganisationRoute = createRoute({
	getParentRoute: () => AppLayoutRoute,
	path: 'organisations/$organisationId',
	component: Organisation,
});

export { OrganisationRoute };

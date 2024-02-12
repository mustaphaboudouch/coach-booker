import { createRoute } from '@tanstack/react-router';
import { AppLayoutRoute } from '../../layouts/app-layout';
import { PageHeader } from '../../components/page-header';
import { Card, Divider, Flex } from '@mantine/core';
import { StatCard } from './stat-card';

const Dashboard = () => {
	return (
		<div>
			<PageHeader title='Bonjour Mustapha 👋' />

			<Card radius='md' withBorder>
				<Flex>
					<StatCard label='Utilisateurs' path='/users' value={100} />
					<Divider orientation='vertical' mx='md' />
					<StatCard label='Organisations' path='/organisations' value={100} />
					<Divider orientation='vertical' mx='md' />
					<StatCard label='Rendez-vous' path='/appointments' value={100} />
				</Flex>
			</Card>
		</div>
	);
};

const DashboardRoute = createRoute({
	getParentRoute: () => AppLayoutRoute,
	path: 'dashboard',
	component: Dashboard,
});

export { DashboardRoute };

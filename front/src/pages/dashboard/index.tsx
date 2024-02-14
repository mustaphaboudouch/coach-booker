import { createRoute } from '@tanstack/react-router';
import { AppLayoutRoute } from '../../layouts/app-layout';
import { PageHeader } from '../../components/ui/page-header';
import { StatsGrid } from '../../components/ui/stats-grid';

const Dashboard = () => {
	return (
		<div>
			<PageHeader title='Bonjour Mustapha 👋' />

			<StatsGrid
				stats={[
					{ label: 'Utilisateurs', path: '/users', value: 100 },
					{ label: 'Organisations', path: '/organisations', value: 100 },
					{ label: 'Rendez-vous', path: '/appointments', value: 100 },
				]}
			/>
		</div>
	);
};

const DashboardRoute = createRoute({
	getParentRoute: () => AppLayoutRoute,
	path: 'dashboard',
	component: Dashboard,
});

export { DashboardRoute };

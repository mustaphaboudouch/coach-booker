import { createRoute } from '@tanstack/react-router';
import { AppLayoutRoute } from '../layouts/app-layout';
import { PageHeader } from '../components/page-header';

const Dashboard = () => {
	return (
		<div>
			<PageHeader title='Dashboard' />
		</div>
	);
};

const DashboardRoute = createRoute({
	getParentRoute: () => AppLayoutRoute,
	path: 'dashboard',
	component: Dashboard,
});

export { DashboardRoute };

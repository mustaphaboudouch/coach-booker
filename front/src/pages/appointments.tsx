import { createRoute } from '@tanstack/react-router';
import { AppLayoutRoute } from '../layouts/app-layout';
import { PageHeader } from '../components/page-header';

const Appointments = () => {
	return (
		<div>
			<PageHeader title='Rendez-vous' />
		</div>
	);
};

const AppointmentsRoute = createRoute({
	getParentRoute: () => AppLayoutRoute,
	path: 'appointments',
	component: Appointments,
});

export { AppointmentsRoute };

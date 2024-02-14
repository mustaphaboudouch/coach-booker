import { createRoute } from '@tanstack/react-router';
import { PageHeader } from '../../components/ui/page-header';
import { AppLayoutRoute } from '../../layouts/app-layout';
import { Tabs } from '@mantine/core';
import { IconStar } from '@tabler/icons-react';
import { FeedbacksTab } from './feedbacks-tab';

const Appointment = () => {
	// const { appointmentId } = AppointmentRoute.useParams();

	return (
		<div>
			<PageHeader title='Appointment' />

			<Tabs defaultValue='feedbacks'>
				<Tabs.List>
					<Tabs.Tab value='feedbacks' leftSection={<IconStar size='1rem' />}>
						Avis clients
					</Tabs.Tab>
				</Tabs.List>

				<FeedbacksTab />
			</Tabs>
		</div>
	);
};

const AppointmentRoute = createRoute({
	getParentRoute: () => AppLayoutRoute,
	path: 'appointments/$appointmentId',
	component: Appointment,
});

export { AppointmentRoute };

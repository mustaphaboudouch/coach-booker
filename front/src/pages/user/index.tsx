import { createRoute } from '@tanstack/react-router';
import { PageHeader } from '../../components/ui/page-header';
import { AppLayoutRoute } from '../../layouts/app-layout';
import { Tabs } from '@mantine/core';
import { IconCalendarClock, IconLock, IconUser } from '@tabler/icons-react';
import { PersonalInfoTab } from './personal-info-tab';
import { ScheduleTab } from './schedule-tab';
import { PasswordTab } from './password-tab';

const User = () => {
	// const { userId } = UserRoute.useParams();

	return (
		<div>
			<PageHeader title='Utilisateur' />

			<Tabs defaultValue='personal-infos'>
				<Tabs.List>
					<Tabs.Tab
						value='personal-infos'
						leftSection={<IconUser size='1rem' />}
					>
						Informations personnelles
					</Tabs.Tab>
					<Tabs.Tab
						value='schedule'
						leftSection={<IconCalendarClock size='1rem' />}
					>
						Créneau
					</Tabs.Tab>
					<Tabs.Tab value='password' leftSection={<IconLock size='1rem' />}>
						Mot de passe
					</Tabs.Tab>
				</Tabs.List>

				<PersonalInfoTab />
				<ScheduleTab />
				<PasswordTab />
			</Tabs>
		</div>
	);
};

const UserRoute = createRoute({
	getParentRoute: () => AppLayoutRoute,
	path: 'users/$userId',
	component: User,
});

export { UserRoute };

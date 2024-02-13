import { createRoute } from '@tanstack/react-router';
import { AppLayoutRoute } from '../../layouts/app-layout';
import { PageHeader } from '../../components/page-header';
import { Tabs } from '@mantine/core';
import { IconCalendarClock, IconLock, IconUser } from '@tabler/icons-react';
import { PersonalInfoTab } from './personal-info-tab';
import { PasswordTab } from './password-tab';
import { ScheduleTab } from './schedule-tab';

const Profile = () => {
	return (
		<div>
			<PageHeader title='Profil' />

			<Tabs defaultValue='personal-infos'>
				<Tabs.List>
					<Tabs.Tab
						value='personal-infos'
						leftSection={<IconUser size='1rem' />}
					>
						Mes informations personnelles
					</Tabs.Tab>
					<Tabs.Tab
						value='schedule'
						leftSection={<IconCalendarClock size='1rem' />}
					>
						Mon créneau
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

const ProfileRoute = createRoute({
	getParentRoute: () => AppLayoutRoute,
	path: 'profile',
	component: Profile,
});

export { ProfileRoute };

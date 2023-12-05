import { Tabs } from '@mantine/core';
import { AppLayout } from '../../components/layout';
import { IconLock, IconUser } from '@tabler/icons-react';
import { PersonalInfoTab } from './personal-info-tab';
import { SecurityTab } from './security-tab';

export const Profile = () => {
	return (
		<AppLayout title='Profil'>
			<Tabs defaultValue='personalInfo'>
				<Tabs.List>
					<Tabs.Tab value='personalInfo' leftSection={<IconUser size='1rem' />}>
						Informations personnelles
					</Tabs.Tab>
					<Tabs.Tab value='security' leftSection={<IconLock size='1rem' />}>
						Sécurité
					</Tabs.Tab>
				</Tabs.List>

				<PersonalInfoTab />
				<SecurityTab />
			</Tabs>
		</AppLayout>
	);
};

import { Tabs } from '@mantine/core';
import { AppLayout } from '../../components/layout';
import { IconLock, IconUser } from '@tabler/icons-react';
import { PersonalInfoTab } from './personal-info-tab';
import { PassowordTab } from './password-tab';

export const Profile = () => {
	return (
		<AppLayout title='Profil'>
			<Tabs defaultValue='personalInfo'>
				<Tabs.List>
					<Tabs.Tab value='personalInfo' leftSection={<IconUser size='1rem' />}>
						Informations personnelles
					</Tabs.Tab>
					<Tabs.Tab value='password' leftSection={<IconLock size='1rem' />}>
						Mot de passe
					</Tabs.Tab>
				</Tabs.List>

				<PersonalInfoTab />
				<PassowordTab />
			</Tabs>
		</AppLayout>
	);
};

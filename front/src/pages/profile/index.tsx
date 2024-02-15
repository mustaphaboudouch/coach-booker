import { ErrorComponent, createRoute, redirect } from '@tanstack/react-router';
import { AppLayoutRoute } from '../../layouts/app-layout';
import { PageHeader } from '../../components/ui/page-header';
import { Loader, Tabs } from '@mantine/core';
import { IconCalendarClock, IconLock, IconUser } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { USER_ROLES, USER_STATUSES } from '../../constants/user';
import { DAY_NAMES } from '../../constants/date';
import { PersonalInfoTab } from '../../components/modules/user/personal-info-tab';
import { ScheduleTab } from '../../components/modules/user/schedule-tab';

type Address = {
	country: string;
	city: string;
	zipCode: string;
	address: string;
};

type Period = {
	startTime: string;
	endTime: string;
};

type Schedule = {
	day: keyof typeof DAY_NAMES;
	periods: Period[];
};

type User = {
	id: string;
	firstname: string;
	lastname: string;
	phoneNumber: string | null;
	status: keyof typeof USER_STATUSES;
	roles: (keyof typeof USER_ROLES)[];
	address: Address;
	schedules: Schedule[];
};

const Profile = () => {
	const { queryClient, user: me } = ProfileRoute.useRouteContext();

	const { data, error, isLoading } = useQuery({
		queryKey: ['users', me?.id],
		queryFn: async () => {
			const { data } = await axios.get(
				`https://thawing-inlet-59198-145d5518a749.herokuapp.com//api/users/${me?.id}`,
			);
			return data;
		},
		enabled: !!me,
	});

	if (isLoading) {
		return <Loader size='sm' />;
	}

	if (error) {
		return <ErrorComponent error={error} />;
	}

	const user: User = data;

	if (!user) {
		return <ErrorComponent error='User not found' />;
	}

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

				{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
				{/* @ts-ignore */}
				<PersonalInfoTab user={user} queryClient={queryClient} />
				{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
				{/* @ts-ignore */}
				<ScheduleTab user={user} queryClient={queryClient} />
				{/* <PasswordTab /> */}
			</Tabs>
		</div>
	);
};

const ProfileRoute = createRoute({
	getParentRoute: () => AppLayoutRoute,
	path: 'profile',
	component: Profile,
	beforeLoad: ({ context }) => {
		if (!context.user) {
			throw redirect({
				to: '/sign-in',
			});
		}
	},
});

export { ProfileRoute };

import { ErrorComponent, createRoute, redirect } from '@tanstack/react-router';
import { PageHeader } from '../../components/ui/page-header';
import { AppLayoutRoute } from '../../layouts/app-layout';
import { Loader, Tabs } from '@mantine/core';
import { IconCalendarClock, IconLock, IconUser } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { PersonalInfoTab } from '../../components/modules/user/personal-info-tab';
import { ScheduleTab } from '../../components/modules/user/schedule-tab';
import { USER_ROLES, USER_STATUSES } from '../../constants/user';
import { DAY_NAMES } from '../../constants/date';

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

const User = () => {
	const queryClient = UserRoute.useRouteContext();
	const { userId } = UserRoute.useParams();

	const { data, error, isLoading } = useQuery({
		queryKey: ['users', userId],
		queryFn: async () => {
			const { data } = await axios.get(
				`https://pure-wave-60095-4115169081f3.herokuapp.com//api/users/${userId}`,
			);
			return data;
		},
	});

	if (isLoading) {
		return <Loader size='sm' />;
	}

	if (error) {
		return <ErrorComponent error={error} />;
	}

	const user: User = data;

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

const UserRoute = createRoute({
	getParentRoute: () => AppLayoutRoute,
	path: 'users/$userId',
	component: User,
	beforeLoad: ({ context }) => {
		if (
			!context.user ||
			(!!context.user &&
				![USER_ROLES.ROLE_ADMIN, USER_ROLES.ROLE_ORG_ADMIN].includes(
					context.user.role,
				))
		) {
			throw redirect({
				to: '/sign-in',
			});
		}
	},
});

export { UserRoute };

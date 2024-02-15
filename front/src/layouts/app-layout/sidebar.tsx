import { NavLink, Stack } from '@mantine/core';
import {
	IconBuilding,
	IconCalendar,
	IconCalendarOff,
	IconChartDonut,
	IconMap,
	IconTags,
	IconUser,
	IconUsers,
} from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { USER_ROLES } from '../../constants/user';
import { AppLayoutRoute } from '.';

const links = [
	{
		label: 'Tableau de bord',
		path: '/dashboard',
		icon: <IconChartDonut size='1rem' stroke={2} />,
		roles: [
			USER_ROLES.ROLE_ADMIN,
			USER_ROLES.ROLE_CLIENT,
			USER_ROLES.ROLE_ORG_ADMIN,
			USER_ROLES.ROLE_ORG_COACH,
		],
	},
	{
		label: 'Utilisateurs',
		path: '/users',
		icon: <IconUsers size='1rem' stroke={2} />,
		roles: [USER_ROLES.ROLE_ADMIN, USER_ROLES.ROLE_ORG_ADMIN],
	},
	{
		label: 'Organisations',
		path: '/organisations',
		icon: <IconBuilding size='1rem' stroke={2} />,
		roles: [USER_ROLES.ROLE_ADMIN],
	},
	{
		label: 'Mon organisation',
		path: '/organisations/1',
		icon: <IconBuilding size='1rem' stroke={2} />,
		roles: [USER_ROLES.ROLE_ORG_ADMIN, USER_ROLES.ROLE_ORG_COACH],
	},
	{
		label: 'Locaux',
		path: '/locations',
		icon: <IconMap size='1rem' stroke={2} />,
		roles: [USER_ROLES.ROLE_ADMIN, USER_ROLES.ROLE_ORG_ADMIN],
	},
	{
		label: 'Services',
		path: '/services',
		icon: <IconTags size='1rem' stroke={2} />,
		roles: [USER_ROLES.ROLE_ADMIN, USER_ROLES.ROLE_ORG_ADMIN],
	},
	{
		label: 'Jours de congés',
		path: '/days-off',
		icon: <IconCalendarOff size='1rem' stroke={2} />,
		roles: [USER_ROLES.ROLE_ORG_ADMIN, USER_ROLES.ROLE_ORG_COACH],
	},
	{
		label: 'Rendez-vous',
		path: '/appointments',
		icon: <IconCalendar size='1rem' stroke={2} />,
		roles: [
			USER_ROLES.ROLE_ADMIN,
			USER_ROLES.ROLE_CLIENT,
			USER_ROLES.ROLE_ORG_ADMIN,
			USER_ROLES.ROLE_ORG_COACH,
		],
	},
	{
		label: 'Profil',
		path: '/profile',
		icon: <IconUser size='1rem' stroke={2} />,
		roles: [
			USER_ROLES.ROLE_ADMIN,
			USER_ROLES.ROLE_CLIENT,
			USER_ROLES.ROLE_ORG_ADMIN,
			USER_ROLES.ROLE_ORG_COACH,
		],
	},
];

const Sidebar = () => {
	const { user: me } = AppLayoutRoute.useRouteContext();

	return (
		<Stack gap={0}>
			{links.map(
				({ label, path, icon, roles }, index) =>
					me &&
					roles.includes(me.role) && (
						<NavLink
							key={index}
							px='lg'
							py='xs'
							component={Link}
							label={label}
							leftSection={icon}
							to={path}
							// active={location.pathname === link.path}
							// activeProps={{
							// 	active: true,
							// }}
						/>
					),
			)}
		</Stack>
	);
};

export { Sidebar };

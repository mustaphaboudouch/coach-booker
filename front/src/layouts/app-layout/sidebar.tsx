import { NavLink, Stack } from '@mantine/core';
import {
	IconBuilding,
	IconCalendar,
	IconCalendarOff,
	IconHome2,
	IconTags,
	IconUser,
	IconUsers,
} from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';

const links = [
	{
		label: 'Dashboard',
		path: '/dashboard',
		icon: <IconHome2 size='1rem' stroke={2} />,
	},
	{
		label: 'Utilisateurs',
		path: '/users',
		icon: <IconUsers size='1rem' stroke={2} />,
	},
	{
		label: 'Organisations',
		path: '/organisations',
		icon: <IconBuilding size='1rem' stroke={2} />,
	},
	{
		label: 'Services',
		path: '/services',
		icon: <IconTags size='1rem' stroke={2} />,
	},
	{
		label: 'Jours de congés',
		path: '/days-off',
		icon: <IconCalendarOff size='1rem' stroke={2} />,
	},
	{
		label: 'Rendez-vous',
		path: '/appointments',
		icon: <IconCalendar size='1rem' stroke={2} />,
	},
	{
		label: 'Profil',
		path: '/profile',
		icon: <IconUser size='1rem' stroke={2} />,
	},
];

const Sidebar = () => {
	return (
		<Stack gap={0}>
			{links.map(({ label, path, icon }, index) => (
				<>
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
				</>
			))}
		</Stack>
	);
};

export { Sidebar };

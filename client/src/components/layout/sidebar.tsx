import { NavLink, Stack } from '@mantine/core';
import { IconHome2, IconUser } from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';

const links = [
	{
		label: 'Dashboard',
		path: '/dashboard',
		icon: <IconHome2 size='1rem' stroke={2} />,
	},
	{
		label: 'Profile',
		path: '/profile',
		icon: <IconUser size='1rem' stroke={2} />,
	},
];

export const Sidebar = () => {
	const location = useLocation();

	return (
		<Stack gap={10}>
			{links.map((link) => (
				<NavLink
					component={Link}
					active={location.pathname === link.path}
					label={link.label}
					leftSection={link.icon}
					to={link.path}
				/>
			))}
		</Stack>
	);
};

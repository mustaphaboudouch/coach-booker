import { NavLink, Stack } from '@mantine/core';
import { IconBuilding, IconHome2, IconUser } from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';

const links = [
	{
		label: 'Dashboard',
		path: '/dashboard',
		icon: <IconHome2 size='1rem' stroke={2} />,
	},
	{
		label: 'Organisations',
		path: '/organisations',
		icon: <IconBuilding size='1rem' stroke={2} />,
	},
	{
		label: 'Profil',
		path: '/profile',
		icon: <IconUser size='1rem' stroke={2} />,
	},
];

export const Sidebar = () => {
	const location = useLocation();

	return (
		<Stack gap={0}>
			{links.map((link, index) => (
				<NavLink
					key={index}
					px='lg'
					py='xs'
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

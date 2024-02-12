import { createRoute } from '@tanstack/react-router';
import { AppLayoutRoute } from '../layouts/app-layout';
import { PageHeader } from '../components/page-header';

const Users = () => {
	return (
		<div>
			<PageHeader title='Utilisateurs' />
		</div>
	);
};

const UsersRoute = createRoute({
	getParentRoute: () => AppLayoutRoute,
	path: 'users',
	component: Users,
});

export { UsersRoute };

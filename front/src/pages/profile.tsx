import { createRoute } from '@tanstack/react-router';
import { AppLayoutRoute } from '../layouts/app-layout';
import { PageHeader } from '../components/page-header';

const Profile = () => {
	return (
		<div>
			<PageHeader title='Profil' />
		</div>
	);
};

const ProfileRoute = createRoute({
	getParentRoute: () => AppLayoutRoute,
	path: 'profile',
	component: Profile,
});

export { ProfileRoute };

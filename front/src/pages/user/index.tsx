import { createRoute } from '@tanstack/react-router';
import { PageHeader } from '../../components/page-header';
import { AppLayoutRoute } from '../../layouts/app-layout';

const User = () => {
	const { userId } = UserRoute.useParams();

	return (
		<div>
			<PageHeader title='Utilisateur' />

			<p>{userId}</p>
		</div>
	);
};

const UserRoute = createRoute({
	getParentRoute: () => AppLayoutRoute,
	path: 'users/$userId',
	component: User,
});

export { UserRoute };

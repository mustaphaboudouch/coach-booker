import { createRoute } from '@tanstack/react-router';
import { AppLayoutRoute } from '../layouts/app-layout';
import { PageHeader } from '../components/page-header';

const Organisations = () => {
	return (
		<div>
			<PageHeader title='Organisations' />
		</div>
	);
};

const OrganisationsRoute = createRoute({
	getParentRoute: () => AppLayoutRoute,
	path: 'organisations',
	component: Organisations,
});

export { OrganisationsRoute };

import { createRoute } from '@tanstack/react-router';
import { AppLayoutRoute } from '../layouts/app-layout';
import { PageHeader } from '../components/page-header';

const Services = () => {
	return (
		<div>
			<PageHeader title='Services' />
		</div>
	);
};

const ServicesRoute = createRoute({
	getParentRoute: () => AppLayoutRoute,
	path: 'services',
	component: Services,
});

export { ServicesRoute };

import { createRoute } from '@tanstack/react-router';
import { AppLayoutRoute } from '../layouts/app-layout';
import { PageHeader } from '../components/page-header';

const Settings = () => {
	return (
		<div>
			<PageHeader title='Paramètres' />
		</div>
	);
};

const SettingsRoute = createRoute({
	getParentRoute: () => AppLayoutRoute,
	path: 'settings',
	component: Settings,
});

export { SettingsRoute };

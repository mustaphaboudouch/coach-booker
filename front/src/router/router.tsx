import { ErrorComponent, createRouter } from '@tanstack/react-router';
import { queryClient } from './queryClient';
import { routes } from './routes';

const router = createRouter({
	routeTree: routes,
	defaultPendingComponent: () => <div>Spinner...</div>,
	defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
	context: {
		user: undefined!,
		queryClient,
	},
	defaultPreload: 'intent',
	defaultPreloadStaleTime: 0,
});

export { router };

import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

type User = {
	id: string;
	name: string;
};

type RootRouteContext = {
	user: User;
	queryClient: QueryClient;
};

const RootLayout = () => {
	return (
		<>
			<Outlet />
			<TanStackRouterDevtools position='bottom-right' />
			<ReactQueryDevtools buttonPosition='bottom-left' />
		</>
	);
};

const RootLayoutRoute = createRootRouteWithContext<RootRouteContext>()({
	component: RootLayout,
});

export { RootLayoutRoute };

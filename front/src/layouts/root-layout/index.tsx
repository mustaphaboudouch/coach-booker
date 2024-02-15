import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { USER_ROLES } from '../../constants/user';

type User =
	| {
			id: string;
			firstname: string;
			lastname: string;
			role: keyof typeof USER_ROLES;
			organizationId: string;
			// eslint-disable-next-line no-mixed-spaces-and-tabs
	  }
	| undefined;

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

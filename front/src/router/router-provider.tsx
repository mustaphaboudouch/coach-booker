import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider as TanstackRouterProvider } from '@tanstack/react-router';
import { queryClient } from './queryClient';
import { router } from './router';

const RouterProvider = () => {
	const user = {
		id: '1',
		name: 'Test User',
	};

	return (
		<QueryClientProvider client={queryClient}>
			<TanstackRouterProvider
				router={router}
				defaultPreload='intent'
				context={{ user }}
			/>
		</QueryClientProvider>
	);
};

export { RouterProvider };

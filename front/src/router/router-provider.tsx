import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient';
import { AuthProvider } from './auth-provider';

const RouterProvider = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider />
		</QueryClientProvider>
	);
};

export { RouterProvider };

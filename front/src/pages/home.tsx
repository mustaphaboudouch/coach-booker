import { createRoute } from '@tanstack/react-router';
import { RootLayoutRoute } from '../layouts/root-layout';

const Home = () => {
	return (
		<div>
			<h1>Home</h1>
		</div>
	);
};

const HomeRoute = createRoute({
	getParentRoute: () => RootLayoutRoute,
	path: '/',
	component: Home,
});

export { HomeRoute };

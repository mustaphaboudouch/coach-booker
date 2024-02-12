import { Outlet } from '@tanstack/react-router';

const AuthLayout = () => {
	return (
		<div>
			<h1>AuthLayout</h1>
			<Outlet />
		</div>
	);
};

export { AuthLayout };

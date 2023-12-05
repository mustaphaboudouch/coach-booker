import { Route, Switch, BrowserRouter } from 'react-router-dom';
import {
	Dashboard,
	Home,
	NotFound,
	PasswordForget,
	PasswordReset,
	Profile,
	SignIn,
	SignUp,
	SignUpClient,
	SignUpCoach,
} from '../pages';

const routes = [
	{
		path: '/',
		component: Home,
	},
	{
		path: '/dashboard',
		component: Dashboard,
	},
	{
		path: '/profile',
		component: Profile,
	},
	{
		path: '/sign-in',
		component: SignIn,
	},
	{
		path: '/sign-up',
		component: SignUp,
	},
	{
		path: '/sign-up-client',
		component: SignUpClient,
	},
	{
		path: '/sign-up-coach',
		component: SignUpCoach,
	},
	{
		path: '/password-forget',
		component: PasswordForget,
	},
	{
		path: '/password-reset',
		component: PasswordReset,
	},
	{
		path: '*',
		component: NotFound,
	},
];

export const Router = () => {
	return (
		<BrowserRouter>
			<Switch>
				{routes.map((route) => (
					<Route exact path={route.path}>
						<route.component />
					</Route>
				))}
			</Switch>
		</BrowserRouter>
	);
};

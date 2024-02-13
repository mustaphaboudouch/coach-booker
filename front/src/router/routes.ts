import { AppLayoutRoute } from '../layouts/app-layout';
import { AuthLayoutRoute } from '../layouts/auth-layout';
import { GuestLayoutRoute } from '../layouts/guest-layout';
import { RootLayoutRoute } from '../layouts/root-layout';
import { AppointmentRoute } from '../pages/appointment';
import { AppointmentsRoute } from '../pages/appointments';
import { PasswordForgetRoute } from '../pages/auth/password-forget';
import { PasswordResetRoute } from '../pages/auth/password-reset';
import { SignInRoute } from '../pages/auth/sign-in';
import { SignUpRoute } from '../pages/auth/sign-up';
import { SignUpClientRoute } from '../pages/auth/sign-up-client';
import { SignUpCoachRoute } from '../pages/auth/sign-up-coach';
import { DashboardRoute } from '../pages/dashboard';
import { DaysOffRoute } from '../pages/days-off';
import { HomeRoute } from '../pages/home';
import { LocationsRoute } from '../pages/locations';
import { OrganisationRoute } from '../pages/organisation';
import { OrganisationsRoute } from '../pages/organisations';
import { ProfileRoute } from '../pages/profile';
import { SearchRoute } from '../pages/search';
import { SearchSingleRoute } from '../pages/search-single';
import { ServicesRoute } from '../pages/services';
import { UserRoute } from '../pages/user';
import { UsersRoute } from '../pages/users';

const routes = RootLayoutRoute.addChildren([
	GuestLayoutRoute.addChildren([HomeRoute, SearchRoute, SearchSingleRoute]),
	AppLayoutRoute.addChildren([
		DashboardRoute,
		UsersRoute,
		UserRoute,
		OrganisationsRoute,
		OrganisationRoute,
		ServicesRoute,
		AppointmentsRoute,
		AppointmentRoute,
		LocationsRoute,
		DaysOffRoute,
		ProfileRoute,
	]),
	AuthLayoutRoute.addChildren([
		SignInRoute,
		SignUpRoute,
		SignUpClientRoute,
		SignUpCoachRoute,
		PasswordForgetRoute,
		PasswordResetRoute,
	]),
]);

export { routes };

import { AppLayoutRoute } from '../layouts/app-layout';
import { RootLayoutRoute } from '../layouts/root-layout';
import { AppointmentRoute } from '../pages/appointment';
import { AppointmentsRoute } from '../pages/appointments';
import { DashboardRoute } from '../pages/dashboard';
import { DaysOffRoute } from '../pages/days-off';
import { HomeRoute } from '../pages/home';
import { LocationsRoute } from '../pages/locations';
import { OrganisationRoute } from '../pages/organisation';
import { OrganisationsRoute } from '../pages/organisations';
import { ProfileRoute } from '../pages/profile';
import { ServicesRoute } from '../pages/services';
import { UserRoute } from '../pages/user';
import { UsersRoute } from '../pages/users';

const routes = RootLayoutRoute.addChildren([
	HomeRoute,
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
]);

export { routes };

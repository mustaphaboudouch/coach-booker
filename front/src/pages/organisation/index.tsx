import { ErrorComponent, createRoute, redirect } from '@tanstack/react-router';
import { PageHeader } from '../../components/ui/page-header';
import { AppLayoutRoute } from '../../layouts/app-layout';
import { EditForm } from '../../components/modules/organisation/edit-form';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Loader } from '@mantine/core';
import { USER_ROLES } from '../../constants/user';

type Organisation = {
	id: string;
	name: string;
	kbis: string;
};

const Organisation = () => {
	const { organisationId } = OrganisationRoute.useParams();

	const { queryClient } = OrganisationRoute.useRouteContext();
	const { data, error, isLoading } = useQuery({
		queryKey: ['organisations', organisationId],
		queryFn: async () => {
			const { data } = await axios.get(
				`https://pure-wave-60095-4115169081f3.herokuapp.com/api/organisations/${organisationId}`,
			);
			return data;
		},
	});

	if (isLoading) {
		return <Loader size='sm' />;
	}

	if (error) {
		return <ErrorComponent error={error} />;
	}

	const organisation: Organisation = data;

	return (
		<>
			<PageHeader title='Organisation' />
			<EditForm organisation={organisation} queryClient={queryClient} />
		</>
	);
};

const OrganisationRoute = createRoute({
	getParentRoute: () => AppLayoutRoute,
	path: 'organisations/$organisationId',
	component: Organisation,
	beforeLoad: ({ context }) => {
		if (
			!context.user ||
			(!!context.user &&
				![USER_ROLES.ROLE_ORG_ADMIN].includes(context.user.role))
		) {
			throw redirect({
				to: '/sign-in',
			});
		}
	},
});

export { OrganisationRoute };

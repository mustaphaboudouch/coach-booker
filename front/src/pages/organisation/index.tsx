import { ErrorComponent, createRoute } from '@tanstack/react-router';
import { PageHeader } from '../../components/ui/page-header';
import { AppLayoutRoute } from '../../layouts/app-layout';
import { EditForm } from '../../components/modules/organisation/edit-form';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Loader } from '@mantine/core';

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
				`http://127.0.0.1:8000/api/organisations/${organisationId}`,
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
});

export { OrganisationRoute };

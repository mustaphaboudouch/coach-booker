import { Skeleton, Stack } from '@mantine/core';
import { AppLayout } from '../components/layout';

export const OrganisationList = () => {
	return (
		<AppLayout title='Organisations'>
			<Stack>
				<Skeleton height={10} />
				<Skeleton height={10} />
				<Skeleton height={10} />
			</Stack>
		</AppLayout>
	);
};

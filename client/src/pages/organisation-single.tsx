import { Skeleton, Stack } from '@mantine/core';
import { AppLayout } from '../components/layout';

export const OrganisationSingle = () => {
	return (
		<AppLayout title='Organisation'>
			<Stack>
				<Skeleton height={10} />
				<Skeleton height={10} />
				<Skeleton height={10} />
			</Stack>
		</AppLayout>
	);
};

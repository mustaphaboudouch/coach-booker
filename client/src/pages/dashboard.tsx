import { Skeleton, Stack } from '@mantine/core';
import { AppLayout } from '../components/layout';

export const Dashboard = () => {
	return (
		<AppLayout title='Dashboard'>
			<Stack>
				<Skeleton height={10} />
				<Skeleton height={10} />
				<Skeleton height={10} />
			</Stack>
		</AppLayout>
	);
};

import { Skeleton, Stack } from '@mantine/core';
import { AppLayout } from '../components/layout';

export const Profile = () => {
	return (
		<AppLayout title='Profil'>
			<Stack>
				<Skeleton height={10} />
				<Skeleton height={10} />
				<Skeleton height={10} />
			</Stack>
		</AppLayout>
	);
};
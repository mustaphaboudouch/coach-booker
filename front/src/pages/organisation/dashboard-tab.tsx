import { Tabs } from '@mantine/core';
import { StatsGrid } from '../../components/ui/stats-grid';

const DashboardTab = () => {
	return (
		<Tabs.Panel value='dashboard' py='xl'>
			<StatsGrid
				stats={[
					{ label: 'Utilisateurs', path: '/users', value: 100 },
					{ label: 'Organisations', path: '/organisations', value: 100 },
					{ label: 'Rendez-vous', path: '/appointments', value: 100 },
				]}
			/>
		</Tabs.Panel>
	);
};

export { DashboardTab };

import { createRoute } from '@tanstack/react-router';
import { AppLayoutRoute } from '../../layouts/app-layout';
import { PageHeader } from '../../components/page-header';
import { Card, Flex, Group, Select, Table, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { DeleteAlert } from './delete-alert';
import { EditDrawer } from './edit-drawer';
import { ValidateAlert } from './validate-alert';
import { RejectAlert } from './reject-alert';
import { CancelAlert } from './cancel-alert';
import { TableEmptyState } from '../../components/table-empty-state';

const Appointments = () => {
	return (
		<div>
			<PageHeader title='Rendez-vous' />

			<Group mb='lg'>
				<Select
					placeholder='Trier par'
					data={[
						{ value: 'AZ', label: 'AZ' },
						{ value: 'ZA', label: 'ZA' },
					]}
				/>
				<TextInput
					type='search'
					placeholder='Recherche...'
					leftSection={<IconSearch size={16} />}
					flex={1}
				/>
				{/* Service */}
				{/* Date */}
				{/* Status */}
			</Group>

			<Card padding={0} radius='md' withBorder>
				<Table.ScrollContainer minWidth={500}>
					<Table verticalSpacing='sm' horizontalSpacing='md'>
						<Table.Thead>
							<Table.Tr>
								<Table.Th>Date et Heure</Table.Th>
								<Table.Th>Coach</Table.Th>
								<Table.Th>Client</Table.Th>
								<Table.Th>Service</Table.Th>
								<Table.Th />
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							<Table.Tr>
								<Table.Td>element.position</Table.Td>
								<Table.Td>element.name</Table.Td>
								<Table.Td>element.email</Table.Td>
								<Table.Td>element.email</Table.Td>
								<Table.Td>
									<Flex gap='xs' justify='flex-end'>
										<ValidateAlert />
										<RejectAlert />
										<CancelAlert />
										<EditDrawer />
										<DeleteAlert />
									</Flex>
								</Table.Td>
							</Table.Tr>
							<TableEmptyState>Aucun rendez-vous.</TableEmptyState>
						</Table.Tbody>
					</Table>
				</Table.ScrollContainer>
			</Card>
		</div>
	);
};

const AppointmentsRoute = createRoute({
	getParentRoute: () => AppLayoutRoute,
	path: 'appointments',
	component: Appointments,
});

export { AppointmentsRoute };

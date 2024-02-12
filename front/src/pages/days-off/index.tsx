import { createRoute } from '@tanstack/react-router';
import { AppLayoutRoute } from '../../layouts/app-layout';
import { PageHeader } from '../../components/page-header';
import {
	Badge,
	Card,
	Flex,
	Group,
	Select,
	Table,
	TextInput,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { DeleteAlert } from './delete-alert';
import { CreateDrawer } from './create-drawer';
import { ValidateAlert } from './validate-alert';
import { RejectAlert } from './reject-alert';
import { PreviewDrawer } from './preview-drawer';
import { TableEmptyState } from '../../components/table-empty-state';

const DaysOff = () => {
	return (
		<div>
			<PageHeader title='Jours de congés' rightSection={<CreateDrawer />} />

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
			</Group>

			<Card padding={0} radius='md' withBorder>
				<Table.ScrollContainer minWidth={500}>
					<Table verticalSpacing='sm' horizontalSpacing='md'>
						<Table.Thead>
							<Table.Tr>
								<Table.Th>Employé</Table.Th>
								<Table.Th>Date</Table.Th>
								<Table.Th>Statut</Table.Th>
								<Table.Th />
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							<Table.Tr>
								<Table.Td>Prénom Nom</Table.Td>
								<Table.Td>De X à Y</Table.Td>
								<Table.Td>
									<Badge color='green'>Confirmé</Badge>
								</Table.Td>
								<Table.Td>
									<Flex gap='xs' justify='flex-end'>
										<ValidateAlert />
										<RejectAlert />
										<PreviewDrawer />
										<DeleteAlert />
									</Flex>
								</Table.Td>
							</Table.Tr>
							<TableEmptyState>Aucune demande de congé.</TableEmptyState>
						</Table.Tbody>
					</Table>
				</Table.ScrollContainer>
			</Card>
		</div>
	);
};

const DaysOffRoute = createRoute({
	getParentRoute: () => AppLayoutRoute,
	path: 'days-off',
	component: DaysOff,
});

export { DaysOffRoute };

import { createRoute } from '@tanstack/react-router';
import { AppLayoutRoute } from '../../layouts/app-layout';
import { PageHeader } from '../../components/page-header';
import { Card, Flex, Group, Input, Select, Table } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { EditDrawer } from './edit-drawer';
import { DeleteAlert } from './delete-alert';
import { TableEmptyState } from '../../components/table-empty-state';

const Organisations = () => {
	return (
		<div>
			<PageHeader title='Organisations' />

			<Group mb='lg'>
				<Select
					placeholder='Trier par'
					data={[
						{ value: 'AZ', label: 'AZ' },
						{ value: 'ZA', label: 'ZA' },
					]}
				/>
				<Input
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
								<Table.Th>Nom</Table.Th>
								<Table.Th>Nbr de membres</Table.Th>
								<Table.Th>KBIS</Table.Th>
								<Table.Th />
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							<Table.Tr>
								<Table.Td>element.position</Table.Td>
								<Table.Td>element.name</Table.Td>
								<Table.Td>element.symbol</Table.Td>
								<Table.Td>
									<Flex gap='xs' justify='flex-end'>
										<EditDrawer />
										<DeleteAlert />
									</Flex>
								</Table.Td>
							</Table.Tr>
							<TableEmptyState>Aucune organisation.</TableEmptyState>
						</Table.Tbody>
					</Table>
				</Table.ScrollContainer>
			</Card>
		</div>
	);
};

const OrganisationsRoute = createRoute({
	getParentRoute: () => AppLayoutRoute,
	path: 'organisations',
	component: Organisations,
});

export { OrganisationsRoute };

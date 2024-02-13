import { createRoute } from '@tanstack/react-router';
import { AppLayoutRoute } from '../../layouts/app-layout';
import { PageHeader } from '../../components/page-header';
import { Card, Flex, Group, Select, Table, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { EditDrawer } from './edit-drawer';
import { DeleteAlert } from './delete-alert';
import { CreateDrawer } from './create-drawer';
import { TableEmptyState } from '../../components/table-empty-state';
import { UsersDrawer } from './users-drawer';

const Locations = () => {
	return (
		<div>
			<PageHeader title='Locaux' rightSection={<CreateDrawer />} />

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
								<Table.Th>Nom</Table.Th>
								<Table.Th>Adresse</Table.Th>
								<Table.Th />
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							<Table.Tr>
								<Table.Td>element.position</Table.Td>
								<Table.Td>element.name</Table.Td>
								<Table.Td>
									<Flex gap='xs' justify='flex-end'>
										<EditDrawer />
										<UsersDrawer />
										<DeleteAlert locationId='1' />
									</Flex>
								</Table.Td>
							</Table.Tr>
							<TableEmptyState>Aucun local.</TableEmptyState>
						</Table.Tbody>
					</Table>
				</Table.ScrollContainer>
			</Card>
		</div>
	);
};

const LocationsRoute = createRoute({
	getParentRoute: () => AppLayoutRoute,
	path: 'locations',
	component: Locations,
});

export { LocationsRoute };

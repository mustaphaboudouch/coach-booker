import {
	Card,
	Flex,
	Group,
	Select,
	Table,
	Tabs,
	TextInput,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { TableEmptyState } from '../../components/table-empty-state';
import { LocationCreateDrawer } from './location-create-drawer';
import { LocationEditDrawer } from './location-edit-drawer';
import { LocationDeleteAlert } from './location-delete-alert';
import { LocationUsersDrawer } from './location-users-drawer';

const LocationsTab = () => {
	return (
		<Tabs.Panel value='locations' py='xl'>
			<Flex justify='flex-end' mb='lg'>
				<LocationCreateDrawer />
			</Flex>

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
										<LocationEditDrawer />
										<LocationUsersDrawer />
										<LocationDeleteAlert />
									</Flex>
								</Table.Td>
							</Table.Tr>
							<TableEmptyState>Aucun local.</TableEmptyState>
						</Table.Tbody>
					</Table>
				</Table.ScrollContainer>
			</Card>
		</Tabs.Panel>
	);
};

export { LocationsTab };

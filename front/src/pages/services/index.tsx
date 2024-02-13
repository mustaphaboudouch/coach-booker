import { createRoute } from '@tanstack/react-router';
import { AppLayoutRoute } from '../../layouts/app-layout';
import { PageHeader } from '../../components/page-header';
import { Card, Flex, Group, Select, Table, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { EditDrawer } from './edit-drawer';
import { DeleteAlert } from './delete-alert';
import { CreateDrawer } from './create-drawer';
import { PreviewDrawer } from './preview-drawer';
import { TableEmptyState } from '../../components/table-empty-state';

const Services = () => {
	return (
		<div>
			<PageHeader title='Services' rightSection={<CreateDrawer />} />

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
								<Table.Th>Durée</Table.Th>
								<Table.Th>Prix</Table.Th>
								<Table.Th />
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							<Table.Tr>
								<Table.Td>element.position</Table.Td>
								<Table.Td>element.name</Table.Td>
								<Table.Td>element.email</Table.Td>
								<Table.Td>
									<Flex gap='xs' justify='flex-end'>
										<PreviewDrawer />
										<EditDrawer />
										<DeleteAlert serviceId='1' />
									</Flex>
								</Table.Td>
							</Table.Tr>
							<TableEmptyState>Aucun service.</TableEmptyState>
						</Table.Tbody>
					</Table>
				</Table.ScrollContainer>
			</Card>
		</div>
	);
};

const ServicesRoute = createRoute({
	getParentRoute: () => AppLayoutRoute,
	path: 'services',
	component: Services,
});

export { ServicesRoute };

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
import { EditDrawer } from './edit-drawer';
import { DeleteAlert } from './delete-alert';
import { InviteDrawer } from './invite-drawer';
import { ValidateAlert } from './validate-alert';
import { RejectAlert } from './reject-alert';
import { TableEmptyState } from '../../components/table-empty-state';

const Users = () => {
	return (
		<div>
			<PageHeader title='Utilisateurs' rightSection={<InviteDrawer />} />

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
								<Table.Th>Utilisateur</Table.Th>
								<Table.Th>Adresse e-mail</Table.Th>
								<Table.Th>Rôle</Table.Th>
								<Table.Th />
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							<Table.Tr>
								<Table.Td>element.position</Table.Td>
								<Table.Td>element.name</Table.Td>
								<Table.Td>
									<Badge>Administrateur</Badge>
								</Table.Td>
								<Table.Td>
									<Flex gap='xs' justify='flex-end'>
										<ValidateAlert />
										<RejectAlert />
										<EditDrawer />
										<DeleteAlert />
									</Flex>
								</Table.Td>
							</Table.Tr>
							<TableEmptyState>Aucun utilisateur.</TableEmptyState>
						</Table.Tbody>
					</Table>
				</Table.ScrollContainer>
			</Card>
		</div>
	);
};

const UsersRoute = createRoute({
	getParentRoute: () => AppLayoutRoute,
	path: 'users',
	component: Users,
});

export { UsersRoute };

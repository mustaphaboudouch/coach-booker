import { Card, Flex, Table } from '@mantine/core';
import { EditDrawer } from './edit-drawer';
import { DeleteAlert } from './delete-alert';
import { UsersDrawer } from './users-drawer';
import { TableEmptyState } from '../../ui/table-empty-state';
import { ProtectedFragment } from '../../ui/protected-fragment';
import { USER_ROLES } from '../../../constants/user';

type Address = {
	country: string;
	city: string;
	zipCode: string;
	address: string;
};

type User = {
	id: string;
	firstname: string;
	lastname: string;
};

type Location = {
	id: string;
	name: string;
	description: string;
	address: Address;
	users: User[];
};

type ListProps = {
	locations: Location[];
};

function formatAddress(address: Address) {
	return `${address.address}, ${address.city}, ${address.country} ${address.zipCode}`;
}

const List = ({ locations }: ListProps) => {
	return (
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
						{locations.length === 0 && (
							<TableEmptyState>Aucune local.</TableEmptyState>
						)}
						{locations.map((location) => (
							<Table.Tr key={location.id}>
								<Table.Td>{location.name}</Table.Td>
								<Table.Td>{formatAddress(location.address)}</Table.Td>
								<Table.Td>
									<Flex gap='xs' justify='flex-end'>
										<ProtectedFragment
											roles={[USER_ROLES.ROLE_ADMIN, USER_ROLES.ROLE_ORG_ADMIN]}
										>
											<EditDrawer location={location} />
											<UsersDrawer location={location} />
											<DeleteAlert locationId={location.id} />
										</ProtectedFragment>
									</Flex>
								</Table.Td>
							</Table.Tr>
						))}
					</Table.Tbody>
				</Table>
			</Table.ScrollContainer>
		</Card>
	);
};

export { List };

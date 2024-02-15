import { Card, Flex, Table } from '@mantine/core';
import { EditDrawer } from './edit-drawer';
import { DeleteAlert } from './delete-alert';
import { PreviewDrawer } from './preview-drawer';
import { TableEmptyState } from '../../ui/table-empty-state';
import { USER_ROLES } from '../../../constants/user';
import { ProtectedFragment } from '../../ui/protected-fragment';

type Service = {
	id: string;
	name: string;
	duration: number;
	price: number;
	description: string;
};

type ListProps = {
	services: Service[];
};

const List = ({ services }: ListProps) => {
	return (
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
						{services.length === 0 && (
							<TableEmptyState>Aucun service.</TableEmptyState>
						)}
						{services.map((service) => (
							<Table.Tr key={service.id}>
								<Table.Td>{service.name}</Table.Td>
								<Table.Td>{service.duration} min</Table.Td>
								<Table.Td>{service.price} €</Table.Td>
								<Table.Td>
									<Flex gap='xs' justify='flex-end'>
										<PreviewDrawer service={service} />
										<ProtectedFragment
											roles={[USER_ROLES.ROLE_ADMIN, USER_ROLES.ROLE_ORG_ADMIN]}
										>
											<EditDrawer service={service} />
											<DeleteAlert serviceId={service.id} />
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

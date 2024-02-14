import { Link } from '@tanstack/react-router';
import { ActionIcon, Badge, Card, Flex, Table } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import { DeleteAlert } from './delete-alert';
import { ValidateAlert } from './validate-alert';
import { RejectAlert } from './reject-alert';
import { TableEmptyState } from '../../../components/ui/table-empty-state';
import { USER_ROLES, USER_STATUSES } from '../../../constants/user';

type User = {
	id: string;
	firstname: string;
	lastname: string;
	email: string;
	roles: (keyof typeof USER_ROLES)[];
	status: keyof typeof USER_STATUSES;
};

type ListProps = {
	users: User[];
};

const List = ({ users }: ListProps) => {
	return (
		<Card padding={0} radius='md' withBorder>
			<Table.ScrollContainer minWidth={500}>
				<Table verticalSpacing='sm' horizontalSpacing='md'>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Utilisateur</Table.Th>
							<Table.Th>Adresse e-mail</Table.Th>
							<Table.Th>Rôle</Table.Th>
							<Table.Th>Statut</Table.Th>
							<Table.Th />
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{!users.length && (
							<TableEmptyState>Aucun utilisateur.</TableEmptyState>
						)}
						{users.map((user) => (
							<Table.Tr key={user.id}>
								<Table.Td>{`${user.firstname} ${user.lastname}`}</Table.Td>
								<Table.Td>{user.email}</Table.Td>
								<Table.Td>
									<Badge>{user.roles[0]}</Badge>
								</Table.Td>
								<Table.Td>
									<Badge>{user.status}</Badge>
								</Table.Td>
								<Table.Td>
									<Flex gap='xs' justify='flex-end'>
										<ActionIcon
											variant='default'
											size='md'
											aria-label='Preview'
											component={Link}
											to={`/users/${user.id}`}
											preload={false}
										>
											<IconExternalLink size='1rem' />
										</ActionIcon>
										<ValidateAlert userId={user.id} />
										<RejectAlert userId={user.id} />
										<DeleteAlert userId={user.id} />
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

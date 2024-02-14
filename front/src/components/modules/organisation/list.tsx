import { Link } from '@tanstack/react-router';
import { ActionIcon, Badge, Card, Flex, Table } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import { EditDrawer } from './edit-drawer';
import { DeleteAlert } from './delete-alert';
import { TableEmptyState } from '../../ui/table-empty-state';
import { ORGANISATION_STATUS } from '../../../constants/organisation';

type Organisation = {
	id: string;
	name: string;
	kbis: string;
	status: keyof typeof ORGANISATION_STATUS;
};

type ListProps = {
	organisations: Organisation[];
};

const List = ({ organisations }: ListProps) => {
	return (
		<Card padding={0} radius='md' withBorder>
			<Table.ScrollContainer minWidth={500}>
				<Table verticalSpacing='sm' horizontalSpacing='md'>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Nom</Table.Th>
							<Table.Th>KBIS</Table.Th>
							<Table.Th>Statut</Table.Th>
							<Table.Th />
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{organisations.length === 0 && (
							<TableEmptyState>Aucune organisation.</TableEmptyState>
						)}
						{organisations.map((organisation) => (
							<Table.Tr key={organisation.id}>
								<Table.Td>{organisation.name}</Table.Td>
								<Table.Td>{organisation.kbis}</Table.Td>
								<Table.Td>
									<Badge>{organisation.status}</Badge>
								</Table.Td>
								<Table.Td>
									<Flex gap='xs' justify='flex-end'>
										<ActionIcon
											variant='default'
											size='md'
											aria-label='Preview'
											component={Link}
											to={`/organisations/${organisation.id}`}
											preload={false}
										>
											<IconExternalLink size='1rem' />
										</ActionIcon>
										<EditDrawer organisation={organisation} />
										<DeleteAlert organisationId={organisation.id} />
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

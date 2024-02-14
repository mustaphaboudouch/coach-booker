import { Badge, Card, Flex, Table } from '@mantine/core';
import { DeleteAlert } from './delete-alert';
import { ValidateAlert } from './validate-alert';
import { RejectAlert } from './reject-alert';
import { PreviewDrawer } from './preview-drawer';
import { TableEmptyState } from '../../ui/table-empty-state';
import { DAY_OFF_STATUSES } from '../../../constants/day-off';

type User = {
	firstname: string;
	lastname: string;
};

type DayOff = {
	id: string;
	startDate: Date;
	endDate: Date;
	status: keyof typeof DAY_OFF_STATUSES;
	reason: string;
	user: User;
};

type ListProps = {
	daysOff: DayOff[];
};

const List = ({ daysOff }: ListProps) => {
	return (
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
						{daysOff.length === 0 && (
							<TableEmptyState>Aucune demande de congé.</TableEmptyState>
						)}
						{daysOff.map((dayOff) => (
							<Table.Tr key={dayOff.id}>
								<Table.Td>{`${dayOff.user.firstname} ${dayOff.user.lastname}`}</Table.Td>
								<Table.Td>
									{dayOff.startDate.toString()} {dayOff.endDate.toString()}
								</Table.Td>
								<Table.Td>
									<Badge color='green'>{dayOff.status}</Badge>
								</Table.Td>
								<Table.Td>
									<Flex gap='xs' justify='flex-end'>
										<ValidateAlert dayOffId={dayOff.id} />
										<RejectAlert dayOffId={dayOff.id} />
										<PreviewDrawer dayOff={dayOff} />
										<DeleteAlert dayOffId={dayOff.id} />
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

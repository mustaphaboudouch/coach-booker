import { Link } from '@tanstack/react-router';
import { ActionIcon, Badge, Card, Flex, Table } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import { EditDrawer } from './edit-drawer';
import { ValidateAlert } from './validate-alert';
import { RejectAlert } from './reject-alert';
import { CancelAlert } from './cancel-alert';
import { TableEmptyState } from '../../../components/ui/table-empty-state';
import { PreviewDrawer } from './preview-drawer';

type Service = {
	name: string;
};

type Appointment = {
	id: string;
	date: string;
	startTime: string;
	endTime: string;
	status: string;
	service: Service;
};

type ListProps = {
	appointments: Appointment[];
};

const List = ({ appointments }: ListProps) => {
	return (
		<Card padding={0} radius='md' withBorder>
			<Table.ScrollContainer minWidth={500}>
				<Table verticalSpacing='sm' horizontalSpacing='md'>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Date</Table.Th>
							<Table.Th>Statut</Table.Th>
							<Table.Th>Service</Table.Th>
							<Table.Th />
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{appointments.length === 0 && (
							<TableEmptyState>Aucun rendez-vous.</TableEmptyState>
						)}
						{appointments.map((appointment) => (
							<Table.Tr key={appointment.id}>
								<Table.Td>{appointment.date}</Table.Td>
								<Table.Td>
									<Badge>{appointment.status}</Badge>
								</Table.Td>
								<Table.Td>{appointment.service.name}</Table.Td>
								<Table.Td>
									<Flex gap='xs' justify='flex-end'>
										<PreviewDrawer appointmentId={appointment.id} />
										<ActionIcon
											variant='default'
											size='md'
											aria-label='Preview'
											component={Link}
											to={`/appointments/${appointment.id}`}
											preload={false}
										>
											<IconExternalLink size='1rem' />
										</ActionIcon>
										<ValidateAlert appointmentId={appointment.id} />
										<RejectAlert appointmentId={appointment.id} />
										<CancelAlert appointmentId={appointment.id} />
										<EditDrawer appointment={appointment} />
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

import { Card, Flex, Rating, Table, Tabs } from '@mantine/core';
import { TableEmptyState } from '../../components/ui/table-empty-state';
import { FeedbacksPreviewDrawer } from './feedbacks-preview-drawer';
import { FeedbacksDeleteAlert } from './feedbacks-delete-alert';

const FeedbacksTab = () => {
	return (
		<Tabs.Panel value='feedbacks' py='xl'>
			<Card padding={0} radius='md' withBorder>
				<Table.ScrollContainer minWidth={500}>
					<Table verticalSpacing='sm' horizontalSpacing='md'>
						<Table.Thead>
							<Table.Tr>
								<Table.Th>Client</Table.Th>
								<Table.Th>Avis</Table.Th>
								<Table.Th />
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							<Table.Tr>
								<Table.Td>Prénom Nom</Table.Td>
								<Table.Td>
									<Rating value={3.5} fractions={2} readOnly />
								</Table.Td>
								<Table.Td>
									<Flex gap='xs' justify='flex-end'>
										<FeedbacksPreviewDrawer />
										<FeedbacksDeleteAlert />
									</Flex>
								</Table.Td>
							</Table.Tr>
							<TableEmptyState>Aucun avis clients.</TableEmptyState>
						</Table.Tbody>
					</Table>
				</Table.ScrollContainer>
			</Card>
		</Tabs.Panel>
	);
};

export { FeedbacksTab };

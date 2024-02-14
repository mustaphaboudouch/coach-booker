import { Flex, Table, Text } from '@mantine/core';
import { IconMoodEmpty } from '@tabler/icons-react';

type TableEmptyStateProps = {
	children: string;
};

const TableEmptyState = ({ children }: TableEmptyStateProps) => {
	return (
		<Table.Tr>
			<Table.Td colSpan={100}>
				<Flex align='center' gap='xs' justify='center' py='lg'>
					<IconMoodEmpty size='1rem' color='gray' />
					<Text size='sm' c='dimmed'>
						{children}
					</Text>
				</Flex>
			</Table.Td>
		</Table.Tr>
	);
};

export { TableEmptyState };

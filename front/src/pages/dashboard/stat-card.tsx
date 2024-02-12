import { ActionIcon, Box, Flex, Text } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';

type StatCardProps = {
	label: string;
	value: number;
	path: string;
};

const StatCard = ({ label, value, path }: StatCardProps) => {
	return (
		<Box flex={1}>
			<Flex justify='space-between'>
				<Text size='sm' c='dimmed'>
					{label}
				</Text>
				<ActionIcon variant='light' size='sm' component={Link} to={path}>
					<IconExternalLink size='1rem' />
				</ActionIcon>
			</Flex>
			<Text size='xl' fw={700}>
				{value}
			</Text>
		</Box>
	);
};

export { StatCard };

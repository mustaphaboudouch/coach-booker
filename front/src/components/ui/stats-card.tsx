import { ActionIcon, Box, Flex, Text } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';

type StatsCardProps = {
	label: string;
	value: number;
	path?: string;
};

const StatsCard = ({ label, value, path }: StatsCardProps) => {
	return (
		<Box flex={1}>
			<Flex justify='space-between'>
				<Text size='sm' c='dimmed'>
					{label}
				</Text>
				{path && (
					<ActionIcon variant='light' size='sm' component={Link} to={path}>
						<IconExternalLink size='1rem' />
					</ActionIcon>
				)}
			</Flex>
			<Text size='xl' fw={700}>
				{value}
			</Text>
		</Box>
	);
};

export { StatsCard, type StatsCardProps };

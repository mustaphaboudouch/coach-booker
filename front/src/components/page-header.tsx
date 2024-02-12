import { Box, Title } from '@mantine/core';

type PageHeaderProps = {
	title: string;
};

const PageHeader = ({ title }: PageHeaderProps) => {
	return (
		<Box component='header' mb='xl'>
			<Title order={1} size='1.5rem'>
				{title}
			</Title>
		</Box>
	);
};

export { PageHeader };

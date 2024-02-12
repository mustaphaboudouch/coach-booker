import { Flex, Title } from '@mantine/core';

type PageHeaderProps = {
	title: string;
	rightSection?: React.ReactNode;
};

const PageHeader = ({ title, rightSection }: PageHeaderProps) => {
	return (
		<Flex align='center' justify='space-between' component='header' mb='xl'>
			<Title order={1} size='1.5rem' lh='md'>
				{title}
			</Title>
			{rightSection}
		</Flex>
	);
};

export { PageHeader };

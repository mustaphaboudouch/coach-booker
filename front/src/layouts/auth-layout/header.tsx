import { Box, Title } from '@mantine/core';

type HeaderProps = {
	title: string;
};

export const Header = ({ title }: HeaderProps) => {
	return (
		<Box component='header' mb='lg'>
			<Title order={1} size='2rem'>
				{title}
			</Title>
		</Box>
	);
};

import { Flex, Text } from '@mantine/core';
import { IconBarbell } from '@tabler/icons-react';

export const Logo = () => {
	return (
		<Flex gap={0} td='none'>
			<IconBarbell />
			<Text tt='capitalize' ml={8} fw={400}>
				Coach
			</Text>
			<Text tt='capitalize' fw={700}>
				Booker
			</Text>
		</Flex>
	);
};

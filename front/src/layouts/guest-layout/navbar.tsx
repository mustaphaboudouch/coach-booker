import { Button, Flex } from '@mantine/core';
import { ColorSchemaSwitcher } from '../../components/color-schema-switcher';
import { IconLogin } from '@tabler/icons-react';

const Navbar = () => {
	return (
		<Flex align='center' justify='space-between' px='lg' h={60}>
			<Flex align='center' gap={16}>
				<h3>Coach Booker</h3>
			</Flex>
			<Flex align='center' gap={16}>
				<ColorSchemaSwitcher />
				<Button leftSection={<IconLogin size='1rem' />}>Se connecter</Button>
			</Flex>
		</Flex>
	);
};

export { Navbar };

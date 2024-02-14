import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';

const ColorSchemaSwitcher = () => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();

	const IconComponent = colorScheme === 'dark' ? IconSun : IconMoon;

	return (
		<ActionIcon
			variant='subtle'
			size='lg'
			aria-label='Toggle color schema'
			onClick={toggleColorScheme}
		>
			<IconComponent size='1.3rem' stroke={1.5} />
		</ActionIcon>
	);
};

export { ColorSchemaSwitcher };

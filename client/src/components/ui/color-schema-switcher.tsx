import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';

export const ColorSchemaSwitcher = () => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();

	const IconComponent = colorScheme === 'dark' ? IconSun : IconMoon;

	return (
		<ActionIcon
			variant='default'
			size='lg'
			aria-label='Toggle color schema'
			onClick={toggleColorScheme}
		>
			<IconComponent style={{ width: '60%', height: '60%' }} stroke={1.5} />
		</ActionIcon>
	);
};

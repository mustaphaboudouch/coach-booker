import { Avatar, Burger, Flex } from '@mantine/core';
import { ColorSchemaSwitcher } from '../../components/color-schema-switcher';

type NavbarProps = {
	isOpen: boolean;
	onToggle: () => void;
};

const Navbar = ({ isOpen, onToggle }: NavbarProps) => {
	return (
		<Flex
			align='center'
			justify='space-between'
			px='lg'
			style={{ height: '100%' }}
		>
			<Flex align='center' gap={16}>
				<Burger opened={isOpen} onClick={onToggle} hiddenFrom='sm' size='sm' />
				<h3>Coach Booker</h3>
			</Flex>
			<Flex align='center' gap={16}>
				<ColorSchemaSwitcher />
				<Avatar
					src='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png'
					alt='Full Name'
				>
					Full Name
				</Avatar>
			</Flex>
		</Flex>
	);
};

export { Navbar };
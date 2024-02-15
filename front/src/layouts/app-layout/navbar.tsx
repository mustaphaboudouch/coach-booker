import { Avatar, Burger, Flex } from '@mantine/core';
import { ColorSchemaSwitcher } from '../../components/ui/color-schema-switcher';
import { Logo } from '../../components/ui/logo';
import { SignOutButton } from '../../components/modules/user/sign-out-button';

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
				<Logo />
			</Flex>
			<Flex align='center' gap={16}>
				<ColorSchemaSwitcher />
				<Avatar
					src='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png'
					alt='Full Name'
				>
					Full Name
				</Avatar>
				<SignOutButton />
			</Flex>
		</Flex>
	);
};

export { Navbar };

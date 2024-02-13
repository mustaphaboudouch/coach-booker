import { createRoute } from '@tanstack/react-router';
import { GuestLayoutRoute } from '../../layouts/guest-layout';
import {
	ActionIcon,
	Autocomplete,
	Card,
	Container,
	Divider,
	Flex,
	Group,
	Stack,
	Text,
	TextInput,
	Title,
} from '@mantine/core';
import {
	Icon24Hours,
	IconMapPin,
	IconMoodHappy,
	IconRun,
	IconSearch,
	IconTag,
} from '@tabler/icons-react';

const Home = () => {
	return (
		<Flex h='100%'>
			<Container size='md' flex={1}>
				<Stack gap='xl' h='100%' justify='center' ta='center' mt={-60}>
					<Title order={1}>Réserver en ligne un RDV avec un coach.</Title>

					<Text c='dimmed'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
						maxime animi eveniet ipsa fugit aliquam quibusdam veniam dolorum?
						Debitis, rem.
					</Text>

					<Card radius='lg' w='100%' withBorder>
						<Flex gap='md' align='center'>
							<Autocomplete
								size='lg'
								radius='md'
								placeholder='Service'
								data={['Service 1', 'Service 2', 'Service 3']}
								flex={1}
								leftSection={<IconTag size='1.3rem' />}
							/>
							<Divider orientation='vertical' />
							<TextInput
								size='lg'
								radius='md'
								type='search'
								placeholder='Ville'
								flex={1}
								leftSection={<IconMapPin size='1.3rem' />}
							/>
							<ActionIcon radius='md' w={50} h={50}>
								<IconSearch />
							</ActionIcon>
						</Flex>
					</Card>

					<Group gap='lg' justify='center'>
						<Group gap='xs'>
							<IconMoodHappy size='1rem' color='gray' />
							<Text size='sm' c='dimmed'>
								Simple
							</Text>
						</Group>
						<Group gap='xs'>
							<IconRun size='1rem' color='gray' />
							<Text size='sm' c='dimmed'>
								Immédiat
							</Text>
						</Group>
						<Group gap='xs'>
							<Icon24Hours size='1rem' color='gray' />
							<Text size='sm' c='dimmed'>
								24h/24
							</Text>
						</Group>
					</Group>
				</Stack>
			</Container>
		</Flex>
	);
};

const HomeRoute = createRoute({
	getParentRoute: () => GuestLayoutRoute,
	path: '/',
	component: Home,
});

export { HomeRoute };

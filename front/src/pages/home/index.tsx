import { Link, createRoute } from '@tanstack/react-router';
import { GuestLayoutRoute } from '../../layouts/guest-layout';
import {
	Button,
	Container,
	Flex,
	Group,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import {
	Icon24Hours,
	IconMoodHappy,
	IconRun,
	IconSearch,
} from '@tabler/icons-react';

const Home = () => {
	return (
		<Flex h='100%'>
			<Container size='md' flex={1}>
				<Stack gap='xl' h='100%' justify='center' ta='center' mt={-60}>
					<Title order={1}>Réserver en ligne un RDV avec un coach.</Title>
					<Text c='dimmed'>
						Choisissez un coach, un créneau et réservez en quelques clics.
						Simple, rapide et efficace, 24h/24.
					</Text>

					<Button
						h={50}
						leftSection={<IconSearch size='1.5rem' />}
						component={Link}
						to='/search'
						preload={false}
						radius='md'
						size='lg'
					>
						Chercher un coach
					</Button>

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

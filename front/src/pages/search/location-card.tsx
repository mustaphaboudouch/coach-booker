import {
	Button,
	Card,
	Flex,
	Group,
	Image,
	Stack,
	Text,
	Title,
	em,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconArrowRight, IconCalendarX, IconMapPin } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';

const LocationCard = () => {
	const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

	return (
		<Card
			withBorder
			radius='md'
			component={Link}
			to='/search/1'
			preload={false}
		>
			<Flex gap='md' align='flex-start' direction={isMobile ? 'column' : 'row'}>
				<Image
					src='https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80'
					w={isMobile ? '100%' : 300}
					h={150}
					radius='md'
				/>
				<Stack gap={0} flex={1} justify='flex-start' w='100%'>
					<Text size='xs' c='dimmed' tt='uppercase' fw={600}>
						Organisation
					</Text>
					<Title order={4}>Location name here</Title>
					<Group gap='xs' mt={4}>
						<IconMapPin size='1rem' color='gray' />
						<Text size='sm' c='dimmed'>
							Paris Archives, 9 Rue des Archives, 75004 Paris
						</Text>
					</Group>

					<Stack gap='xs' mt='md'>
						<Group>
							<Text size='sm' c='dimmed' w={100}>
								Aujourd'hui
							</Text>
							<Group gap='xs'>
								<Button variant='default' size='xs'>
									10:00
								</Button>
								<Button variant='default' size='xs'>
									10:00
								</Button>
								<Button variant='default' size='xs'>
									10:00
								</Button>
								<Button variant='default' size='xs'>
									10:00
								</Button>
							</Group>
						</Group>
						<Group>
							<Text size='sm' c='dimmed' w={100}>
								Demain
							</Text>
							<Group gap='xs'>
								<Button variant='default' size='xs'>
									10:00
								</Button>
								<Button variant='default' size='xs'>
									10:00
								</Button>
								<Button variant='default' size='xs'>
									10:00
								</Button>
								<Button variant='default' size='xs'>
									10:00
								</Button>
							</Group>
						</Group>
					</Stack>

					<Card withBorder radius='md' mt='md' py='lg'>
						<Group justify='center' gap='xs'>
							<IconCalendarX size='0.9rem' color='gray' />
							<Text size='xs' c='dimmed'>
								Aucune disponibilité
							</Text>
						</Group>
					</Card>
				</Stack>
			</Flex>

			<Button
				rightSection={<IconArrowRight size='1rem' />}
				component={Link}
				to='/search/1'
				mt='md'
			>
				Prendre RDV
			</Button>
		</Card>
	);
};

export { LocationCard };

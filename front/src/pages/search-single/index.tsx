import { ErrorComponent, createRoute } from '@tanstack/react-router';
import { GuestLayoutRoute } from '../../layouts/guest-layout';
import {
	Accordion,
	Avatar,
	Card,
	Center,
	Container,
	Grid,
	Group,
	Image,
	Loader,
	ScrollArea,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconMapPin } from '@tabler/icons-react';
import { BookingDrawer } from './booking-drawer';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type User = {
	id: string;
	firstname: string;
	lastname: string;
};

type Address = {
	id: string;
	country: string;
	city: string;
	zipCode: string;
	address: string;
};

type Service = {
	id: string;
	name: string;
	description: string;
	price: number;
	duration: number;
};

type Organisation = {
	id: string;
	name: string;
	services: Service[];
};

type Location = {
	id: string;
	name: string;
	description: string;
	address: Address;
	organisation: Organisation;
	users: User[];
};

const SearchSingle = () => {
	const { locationId } = SearchSingleRoute.useParams();

	const { data, error, isLoading } = useQuery({
		queryKey: ['locations', locationId],
		queryFn: async () => {
			const { data } = await axios.get(
				`https://thawing-inlet-59198-145d5518a749.herokuapp.com//api/locations/${locationId}`,
			);
			return data;
		},
	});

	if (isLoading) {
		return <Loader size='sm' />;
	}

	if (error) {
		return <ErrorComponent error={error} />;
	}

	const location: Location = data;

	return (
		<ScrollArea flex={1} h='calc(100vh - 60px)'>
			<Container size='lg' py='xl'>
				<Stack gap={6} mb='xl'>
					<Text size='sm' c='dimmed' tt='uppercase' fw={600}>
						{location.organisation.name}
					</Text>
					<Title order={1} size='2rem'>
						{location.name}
					</Title>
					<Group gap='xs'>
						<IconMapPin size='1.1rem' color='gray' />
						<Text c='dimmed'>
							{`${location.address.address} ${location.address.city}, ${location.address.zipCode} ${location.address.country}`}
						</Text>
					</Group>
				</Stack>

				<Carousel
					withIndicators
					height={200}
					slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }}
					slideGap={{ base: 0, sm: 'md' }}
					loop
					align='start'
				>
					<Carousel.Slide>
						<Image
							src='https://media.gqmagazine.fr/photos/64ef08cf07d7992232c3d5e2/16:9/w_2240,c_limit/474A07541.jpg'
							w='100%'
							h={200}
							radius='md'
						/>
					</Carousel.Slide>
					<Carousel.Slide>
						<Image
							src='https://media.gqmagazine.fr/photos/64ef08cf07d7992232c3d5e2/16:9/w_2240,c_limit/474A07541.jpg'
							w='100%'
							h={200}
							radius='md'
						/>
					</Carousel.Slide>
					<Carousel.Slide>
						<Image
							src='https://media.gqmagazine.fr/photos/64ef08cf07d7992232c3d5e2/16:9/w_2240,c_limit/474A07541.jpg'
							w='100%'
							h={200}
							radius='md'
						/>
					</Carousel.Slide>
					<Carousel.Slide>
						<Image
							src='https://media.gqmagazine.fr/photos/64ef08cf07d7992232c3d5e2/16:9/w_2240,c_limit/474A07541.jpg'
							w='100%'
							h={200}
							radius='md'
						/>
					</Carousel.Slide>
					<Carousel.Slide>
						<Image
							src='https://media.gqmagazine.fr/photos/64ef08cf07d7992232c3d5e2/16:9/w_2240,c_limit/474A07541.jpg'
							w='100%'
							h={200}
							radius='md'
						/>
					</Carousel.Slide>
					<Carousel.Slide>
						<Image
							src='https://media.gqmagazine.fr/photos/64ef08cf07d7992232c3d5e2/16:9/w_2240,c_limit/474A07541.jpg'
							w='100%'
							h={200}
							radius='md'
						/>
					</Carousel.Slide>
				</Carousel>

				<Card withBorder radius='md' mt='xl'>
					<Stack>
						<Title order={2} size='1.5rem'>
							À propos
						</Title>
						<Text size='sm' c='dimmed'>
							{location.description}
						</Text>
					</Stack>
				</Card>

				<Card withBorder radius='md' mt='xl'>
					<Stack>
						<Title order={2} size='1.5rem'>
							Coachs
						</Title>
						<Grid>
							{location.users.map((user) => (
								<Grid.Col span={{ base: 4, sm: 3, lg: 2 }} key={user.id}>
									<Card withBorder radius='md'>
										<Stack align='center' gap='xs'>
											<Avatar size='md' />
											<Text size='sm' c='dimmed' fw={600}>
												{user.firstname} {user.lastname}
											</Text>
										</Stack>
									</Card>
								</Grid.Col>
							))}
						</Grid>
					</Stack>
				</Card>

				<Card withBorder radius='md' mt='xl'>
					<Stack>
						<Title order={2} size='1.5rem'>
							Services
						</Title>

						<Accordion chevronPosition='left' variant='contained' radius='md'>
							{location.organisation.services.map((service) => (
								<Accordion.Item key={service.id} value={service.id.toString()}>
									<Center>
										<Accordion.Control>
											<Text size='sm'>{service.name}</Text>
										</Accordion.Control>
										<Group px='md' wrap='nowrap'>
											<Text
												size='sm'
												c='dimmed'
												style={{ whiteSpace: 'nowrap' }}
											>
												{service.price} € • {service.duration} min
											</Text>
											<BookingDrawer
												serviceId={service.id}
												users={location.users}
												locationId={location.id}
											/>
										</Group>
									</Center>
									<Accordion.Panel>
										<Text size='sm' c='dimmed'>
											{service.description}
										</Text>
									</Accordion.Panel>
								</Accordion.Item>
							))}
						</Accordion>
					</Stack>
				</Card>

				{/* <Card withBorder radius='md' mt='xl'>
					<Stack>
						<Title order={2} size='1.5rem'>
							Où se situe le local ?
						</Title>
						<Card radius='md' w='100%' h={300} bg='rgba(255,0,0,0.3)'></Card>
					</Stack>
				</Card> */}
			</Container>
		</ScrollArea>
	);
};

const SearchSingleRoute = createRoute({
	getParentRoute: () => GuestLayoutRoute,
	path: '/search/$locationId',
	component: SearchSingle,
});

export { SearchSingleRoute };

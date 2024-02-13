import { Link, createRoute } from '@tanstack/react-router';
import { GuestLayoutRoute } from '../../layouts/guest-layout';
import {
	Accordion,
	Avatar,
	Button,
	Card,
	Center,
	Container,
	Flex,
	Grid,
	Group,
	Image,
	ScrollArea,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconMapPin } from '@tabler/icons-react';

const SearchSingle = () => {
	// const { locationId } = SearchSingleRoute.useParams();

	return (
		<ScrollArea flex={1} h='calc(100vh - 60px)'>
			<Container size='lg' py='xl'>
				<Stack gap={6} mb='xl'>
					<Text size='sm' c='dimmed' tt='uppercase' fw={600}>
						Organisation
					</Text>
					<Title order={1} size='2rem'>
						The location name here
					</Title>
					<Group gap='xs'>
						<IconMapPin size='1.1rem' color='gray' />
						<Text c='dimmed'>
							Paris Archives, 9 Rue des Archives, 75004 Paris
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
							src='https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80'
							w='100%'
							h={200}
							radius='md'
						/>
					</Carousel.Slide>
					<Carousel.Slide>
						<Image
							src='https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80'
							w='100%'
							h={200}
							radius='md'
						/>
					</Carousel.Slide>
					<Carousel.Slide>
						<Image
							src='https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80'
							w='100%'
							h={200}
							radius='md'
						/>
					</Carousel.Slide>
					<Carousel.Slide>
						<Image
							src='https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80'
							w='100%'
							h={200}
							radius='md'
						/>
					</Carousel.Slide>
					<Carousel.Slide>
						<Image
							src='https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80'
							w='100%'
							h={200}
							radius='md'
						/>
					</Carousel.Slide>
					<Carousel.Slide>
						<Image
							src='https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80'
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
							Lorem ipsum dolor sit amet consectetur, adipisicing elit.
							Recusandae accusantium excepturi possimus ad dolor, id architecto
							nesciunt cum obcaecati quae beatae dicta. Nemo sequi aliquam iusto
							modi, earum aut enim non debitis doloribus aspernatur ut dicta
							fugit sapiente qui natus quasi. Tempora alias recusandae sapiente
							repudiandae totam placeat enim quo animi aliquam tempore
							asperiores vitae nostrum, corporis maiores consequatur quas
							suscipit, ex sit, libero quod. Aliquam consectetur pariatur
							expedita optio porro dolor asperiores iure, quis distinctio quam
							dignissimos beatae, recusandae sed quas nobis corrupti aperiam
							quisquam fugit! Quidem, cumque minus aut odit aspernatur, saepe
							facilis consequatur possimus totam asperiores impedit.
						</Text>
					</Stack>
				</Card>

				<Card withBorder radius='md' mt='xl'>
					<Stack>
						<Title order={2} size='1.5rem'>
							Coachs
						</Title>
						<Grid>
							<Grid.Col span={{ base: 4, sm: 3, lg: 2 }}>
								<Card
									withBorder
									radius='md'
									component={Link}
									to='/coachs/1'
									preload={false}
								>
									<Stack align='center' gap='xs'>
										<Avatar size='md' />
										<Text size='sm' c='dimmed' fw={600}>
											Prénom Nom
										</Text>
									</Stack>
								</Card>
							</Grid.Col>
							<Grid.Col span={{ base: 4, sm: 3, lg: 2 }}>
								<Card
									withBorder
									radius='md'
									component={Link}
									to='/coachs/1'
									preload={false}
								>
									<Stack align='center' gap='xs'>
										<Avatar size='md' />
										<Text size='sm' c='dimmed' fw={600}>
											Prénom Nom
										</Text>
									</Stack>
								</Card>
							</Grid.Col>
							<Grid.Col span={{ base: 4, sm: 3, lg: 2 }}>
								<Card
									withBorder
									radius='md'
									component={Link}
									to='/coachs/1'
									preload={false}
								>
									<Stack align='center' gap='xs'>
										<Avatar size='md' />
										<Text size='sm' c='dimmed' fw={600}>
											Prénom Nom
										</Text>
									</Stack>
								</Card>
							</Grid.Col>
							<Grid.Col span={{ base: 4, sm: 3, lg: 2 }}>
								<Card
									withBorder
									radius='md'
									component={Link}
									to='/coachs/1'
									preload={false}
								>
									<Stack align='center' gap='xs'>
										<Avatar size='md' />
										<Text size='sm' c='dimmed' fw={600}>
											Prénom Nom
										</Text>
									</Stack>
								</Card>
							</Grid.Col>
							<Grid.Col span={{ base: 4, sm: 3, lg: 2 }}>
								<Card
									withBorder
									radius='md'
									component={Link}
									to='/coachs/1'
									preload={false}
								>
									<Stack align='center' gap='xs'>
										<Avatar size='md' />
										<Text size='sm' c='dimmed' fw={600}>
											Prénom Nom
										</Text>
									</Stack>
								</Card>
							</Grid.Col>
						</Grid>
					</Stack>
				</Card>

				<Card withBorder radius='md' mt='xl'>
					<Stack>
						<Title order={2} size='1.5rem'>
							Services
						</Title>

						<Accordion chevronPosition='left' variant='contained' radius='md'>
							<Accordion.Item value='service-1'>
								<Center>
									<Accordion.Control>
										<Text size='sm'>Service name 1</Text>
									</Accordion.Control>
									<Group px='md' wrap='nowrap'>
										<Text size='sm' c='dimmed' style={{ whiteSpace: 'nowrap' }}>
											100 € • 15 min
										</Text>
										<Button size='xs'>Choisir</Button>
									</Group>
								</Center>
								<Accordion.Panel>
									<Text size='sm' c='dimmed'>
										Lorem ipsum dolor sit, amet consectetur adipisicing elit.
										Vitae reprehenderit exercitationem repellendus accusamus
										repellat voluptas rem adipisci dolor autem iure!
									</Text>
								</Accordion.Panel>
							</Accordion.Item>
							<Accordion.Item value='service-2'>
								<Center>
									<Accordion.Control>
										<Text size='sm'>Service name 2</Text>
									</Accordion.Control>
									<Group px='md' wrap='nowrap'>
										<Text size='sm' c='dimmed' style={{ whiteSpace: 'nowrap' }}>
											100 € • 15 min
										</Text>
										<Button size='xs'>Choisir</Button>
									</Group>
								</Center>
								<Accordion.Panel>
									<Text size='sm' c='dimmed'>
										Lorem ipsum dolor sit, amet consectetur adipisicing elit.
										Vitae reprehenderit exercitationem repellendus accusamus
										repellat voluptas rem adipisci dolor autem iure!
									</Text>
								</Accordion.Panel>
							</Accordion.Item>
							<Accordion.Item value='service-3'>
								<Center>
									<Accordion.Control>
										<Text size='sm'>Service name 3</Text>
									</Accordion.Control>
									<Group px='md' wrap='nowrap'>
										<Text size='sm' c='dimmed' style={{ whiteSpace: 'nowrap' }}>
											100 € • 15 min
										</Text>
										<Button size='xs'>Choisir</Button>
									</Group>
								</Center>
								<Accordion.Panel>
									<Text size='sm' c='dimmed'>
										Lorem ipsum dolor sit, amet consectetur adipisicing elit.
										Vitae reprehenderit exercitationem repellendus accusamus
										repellat voluptas rem adipisci dolor autem iure!
									</Text>
								</Accordion.Panel>
							</Accordion.Item>
						</Accordion>
					</Stack>
				</Card>

				<Card withBorder radius='md' mt='xl'>
					<Stack>
						<Title order={2} size='1.5rem'>
							Où se situe le local ?
						</Title>

						<Flex w='100%' h={300} bg='rgba(255,0,0,0.3)'></Flex>
					</Stack>
				</Card>
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

import { ErrorComponent, Link, createRoute } from '@tanstack/react-router';
import { GuestLayoutRoute } from '../../layouts/guest-layout';
import {
	Button,
	Divider,
	Flex,
	Grid,
	Loader,
	ScrollArea,
	Select,
	Stack,
	TextInput,
} from '@mantine/core';
import { IconMapPin, IconSearch } from '@tabler/icons-react';
import { LocationCard } from './location-card';
import { useForm } from '@mantine/form';
import { z } from 'zod';
import { Map } from './map';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type Address = {
	country: string;
	city: string;
	zipCode: string;
	address: string;
};

type Organisation = {
	id: string;
	name: string;
};

type Location = {
	id: string;
	name: string;
	description: string;
	address: Address;
	organisation: Organisation;
};

const Search = () => {
	const searchParams = SearchRoute.useSearch();
	const form = useForm({
		initialValues: {
			search: searchParams.search,
			sort: searchParams.sort,
			address: searchParams.address,
		},
	});

	const { data, error, isLoading } = useQuery({
		queryKey: ['locations'],
		queryFn: async () => {
			const { data } = await axios.get(`https://pure-wave-60095-4115169081f3.herokuapp.com/api/locations`);
			return data['hydra:member'];
		},
	});

	if (isLoading) {
		return <Loader size='sm' />;
	}

	if (error) {
		return <ErrorComponent error={error} />;
	}

	return (
		<Flex h='100%' flex={1} direction='column'>
			<Grid p='lg'>
				<Grid.Col span={{ base: 12 }}>
					<TextInput
						type='search'
						placeholder='Adresse, ville, code postal...'
						leftSection={<IconMapPin size='1rem' />}
						{...form.getInputProps('address')}
					/>
				</Grid.Col>
				<Grid.Col span={{ base: 12, sm: 3, lg: 2 }}>
					<Select
						placeholder='Trier par'
						data={[
							{ value: 'ASC', label: 'De A à Z' },
							{ value: 'DESC', label: 'De Z à A' },
						]}
						{...form.getInputProps('sort')}
					/>
				</Grid.Col>
				<Grid.Col span={{ base: 12, sm: 6, lg: 8 }}>
					<TextInput
						type='search'
						placeholder='Recherche...'
						leftSection={<IconSearch size={16} />}
						flex={1}
						{...form.getInputProps('search')}
					/>
				</Grid.Col>
				<Grid.Col span={{ base: 12, sm: 3, lg: 2 }}>
					<Button component={Link} to='/search' preload={false}>
						Rechercher
					</Button>
				</Grid.Col>
			</Grid>

			<Divider />

			<Flex flex={1}>
				<ScrollArea h='calc(100vh - 60px - 128px)' flex={1}>
					<Stack px='lg' py='xl'>
						{data.map((location: Location) => (
							<LocationCard location={location} />
						))}
					</Stack>
				</ScrollArea>
				<Stack flex={1} bg='rgba(255,0,0,0.3)' hidden visibleFrom='md'>
					<Map />
				</Stack>
			</Flex>
		</Flex>
	);
};

const searchParamsSchema = z.object({
	search: z.string().catch(''),
	address: z.string().catch(''),
	sort: z.enum(['ASC', 'DESC']).catch('ASC'),
});

const SearchRoute = createRoute({
	getParentRoute: () => GuestLayoutRoute,
	path: '/search',
	component: Search,
	validateSearch: (search) => searchParamsSchema.parse(search),
});

export { SearchRoute };

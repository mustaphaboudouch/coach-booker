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

// function getGeolocation(address: string) {
// 	setDefaults({
// 		key: 'AIzaSyCiCpE2tG1KUk2Cx50tUG10EffjhsifFqQ',
// 		language: 'fr',
// 		region: 'fr',
// 		outputFormat: OutputFormat.JSON,
// 	});

// 	fromAddress(address)
// 		.then((results) => {
// 			const { lat: latitude, lng: longitude } = results[0].geometry.location;
// 			return { latitude, longitude };
// 		})
// 		.catch(() => {
// 			return { latitude: 48.864716, longitude: 2.349014 };
// 		});
// }

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
		queryKey: ['locations', searchParams],
		queryFn: async () => {
			const { data } = await axios.get(
				`http://127.0.0.1:8000/api/locations/${searchParams.search}/${searchParams.address}/${searchParams.sort}`,
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

	console.log('data', data);

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
					<Button
						component={Link}
						to='/search'
						preload={false}
						search={{
							search: form.values.search,
							address: form.values.address,
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							// @ts-ignore
							sort: form.values.sort,
						}}
					>
						Rechercher
					</Button>
				</Grid.Col>
			</Grid>

			<Divider />

			<Flex flex={1}>
				<ScrollArea h='calc(100vh - 60px - 128px)' flex={1}>
					<Stack px='lg' py='xl'>
						<LocationCard />
						<LocationCard />
						<LocationCard />
						<LocationCard />
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

import { createRoute } from '@tanstack/react-router';
import { GuestLayoutRoute } from '../../layouts/guest-layout';
import {
	Autocomplete,
	Divider,
	Flex,
	Grid,
	ScrollArea,
	Select,
	Stack,
	TextInput,
} from '@mantine/core';
import { IconMapPin, IconSearch, IconTag } from '@tabler/icons-react';
import { LocationCard } from './location-card';

const Search = () => {
	return (
		<Flex h='100%' flex={1} direction='column'>
			<Grid p='lg'>
				<Grid.Col span={{ base: 12 }}>
					<TextInput
						type='search'
						placeholder='Recherche...'
						leftSection={<IconSearch size={16} />}
						flex={1}
					/>
				</Grid.Col>
				<Grid.Col span={{ base: 4, sm: 3, lg: 2 }}>
					<Select
						placeholder='Trier par'
						data={[
							{ value: 'AZ', label: 'AZ' },
							{ value: 'ZA', label: 'ZA' },
						]}
					/>
				</Grid.Col>
				<Grid.Col span={{ base: 4, sm: 3, lg: 2 }}>
					<Autocomplete
						placeholder='Service'
						data={['Service 1', 'Service 2', 'Service 3']}
						leftSection={<IconTag size='1rem' />}
					/>
				</Grid.Col>
				<Grid.Col span={{ base: 4, sm: 3, lg: 2 }}>
					<TextInput
						type='search'
						placeholder='Ville'
						leftSection={<IconMapPin size='1rem' />}
					/>
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
					Map
				</Stack>
			</Flex>
		</Flex>
	);
};

const SearchRoute = createRoute({
	getParentRoute: () => GuestLayoutRoute,
	path: '/search',
	component: Search,
});

export { SearchRoute };

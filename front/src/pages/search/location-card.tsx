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
import { IconArrowRight, IconMapPin } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';

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

type LocationCardProps = {
	location: Location;
};

const LocationCard = ({ location }: LocationCardProps) => {
	const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

	return (
		<Card
			withBorder
			radius='md'
			component={Link}
			to={`/search/${location.id}`}
			preload={false}
		>
			<Flex gap='md' align='flex-start' direction={isMobile ? 'column' : 'row'}>
				<Image
					src='https://media.gqmagazine.fr/photos/64ef08cf07d7992232c3d5e2/16:9/w_2240,c_limit/474A07541.jpg'
					w={isMobile ? '100%' : 300}
					h={150}
					radius='md'
				/>
				<Stack gap={0} flex={1} justify='flex-start' w='100%'>
					<Text size='xs' c='dimmed' tt='uppercase' fw={600}>
						{location.organisation.name}
					</Text>
					<Title order={4}>{location.name}</Title>
					<Group gap='xs' mt={4}>
						<IconMapPin size='1rem' color='gray' />
						<Text size='sm' c='dimmed'>
							{location.address.address}, {location.address.zipCode}{' '}
							{location.address.city} {location.address.country}
						</Text>
					</Group>
				</Stack>
			</Flex>

			<Button
				rightSection={<IconArrowRight size='1rem' />}
				component={Link}
				to={`/search/${location.id}`}
				mt='md'
			>
				Prendre RDV
			</Button>
		</Card>
	);
};

export { LocationCard };

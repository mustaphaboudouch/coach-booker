import {
	ActionIcon,
	Avatar,
	Badge,
	Card,
	CloseButton,
	Grid,
	Group,
	Pagination,
	Select,
	Table,
	Text,
	TextInput,
	Tooltip,
} from '@mantine/core';
import { AppLayout } from '../components/layout';
import {
	IconArrowsSort,
	IconEdit,
	IconEye,
	IconFilter,
	IconSearch,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export const OrganisationList = () => {
	return (
		<AppLayout title='Organisations'>
			<Grid mb='lg' grow>
				<Grid.Col span={{ base: 12, md: 2, lg: 1 }}>
					<Select
						placeholder='Trier par'
						data={['Actif', 'Inactif', 'En attente']}
						leftSection={<IconArrowsSort size='1rem' />}
					/>
				</Grid.Col>
				<Grid.Col span={6}>
					<TextInput
						placeholder='Recherche'
						leftSection={<IconSearch size='1rem' />}
						rightSection={
							<CloseButton aria-label='Clear serach input' onClick={() => {}} />
						}
					/>
				</Grid.Col>
				<Grid.Col span={{ base: 12, md: 2, lg: 1 }}>
					<Select
						placeholder='Filter par statut'
						data={['Actif', 'Inactif', 'En attente']}
						leftSection={<IconFilter size='1rem' />}
					/>
				</Grid.Col>
			</Grid>

			<Card radius='md' withBorder>
				<Card.Section>
					<Table highlightOnHover horizontalSpacing='md' verticalSpacing='sm'>
						<Table.Thead>
							<Table.Tr>
								<Table.Th>Organisation</Table.Th>
								<Table.Th>N° Kbis</Table.Th>
								<Table.Th>Statut</Table.Th>
								<Table.Th />
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							{Array(5)
								.fill(0)
								.map((_, index) => (
									<Table.Tr key={index}>
										<Table.Td>
											<Group>
												<Avatar
													radius='md'
													src='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png'
													alt='Organisation Name'
												>
													Organisation Name
												</Avatar>
												<Text size='sm'>Organisation Name</Text>
											</Group>
										</Table.Td>
										<Table.Td>753 892 926 R.C.S. Paris</Table.Td>
										<Table.Td>
											<Badge>Actif</Badge>
										</Table.Td>
										<Table.Td align='right'>
											<Tooltip label='Modifier'>
												<ActionIcon variant='subtle' size='lg'>
													<IconEdit size='1rem' />
												</ActionIcon>
											</Tooltip>
											<Tooltip label='Voir'>
												<ActionIcon
													variant='subtle'
													size='lg'
													component={Link}
													to='/organisations/1'
												>
													<IconEye size='1rem' />
												</ActionIcon>
											</Tooltip>
										</Table.Td>
									</Table.Tr>
								))}
						</Table.Tbody>
					</Table>
				</Card.Section>
			</Card>

			<Group mt='xl' justify='center'>
				<Pagination total={10} />
			</Group>
		</AppLayout>
	);
};

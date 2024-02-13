import {
	Accordion,
	Button,
	Drawer,
	Flex,
	Grid,
	Radio,
	Select,
	Stack,
	Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { DAY_NAMES } from '../../constants/date';

const BookingDrawer = () => {
	const [opened, { open, close }] = useDisclosure(false);

	const onConfirm = () => {
		console.log('CONFIRM');
	};

	return (
		<>
			<Drawer position='right' opened={opened} onClose={close}>
				<Stack gap='sm'>
					<Select
						flex={1}
						label='Coach'
						placeholder='Coach'
						data={[
							{ value: '1', label: 'Coach 1' },
							{ value: '2', label: 'Coach 2' },
							{ value: '3', label: 'Coach 3' },
						]}
						withAsterisk
					/>

					<Radio.Group label='Heure' withAsterisk>
						<Accordion variant='contained'>
							<Accordion.Item value={DAY_NAMES.MONDAY}>
								<Accordion.Control>
									<Text size='sm' c='dimmed'>
										Lundi 13 Févr.
									</Text>
								</Accordion.Control>
								<Accordion.Panel>
									<Grid>
										<Grid.Col span={{ base: 3 }}>
											<Radio value='10:00' label='10:00' />
										</Grid.Col>
										<Grid.Col span={{ base: 3 }}>
											<Radio value='10:00' label='10:00' />
										</Grid.Col>
										<Grid.Col span={{ base: 3 }}>
											<Radio value='10:00' label='10:00' />
										</Grid.Col>
										<Grid.Col span={{ base: 3 }}>
											<Radio value='10:00' label='10:00' />
										</Grid.Col>
										<Grid.Col span={{ base: 3 }}>
											<Radio value='10:00' label='10:00' />
										</Grid.Col>
										<Grid.Col span={{ base: 3 }}>
											<Radio value='10:00' label='10:00' />
										</Grid.Col>
									</Grid>
								</Accordion.Panel>
							</Accordion.Item>
							<Accordion.Item value={DAY_NAMES.TUESDAY}>
								<Accordion.Control>
									<Text size='sm' c='dimmed'>
										Mardi 14 Févr.
									</Text>
								</Accordion.Control>
								<Accordion.Panel>
									<Grid>
										<Grid.Col span={{ base: 3 }}>
											<Radio value='10:00' label='10:00' />
										</Grid.Col>
										<Grid.Col span={{ base: 3 }}>
											<Radio value='10:00' label='10:00' />
										</Grid.Col>
										<Grid.Col span={{ base: 3 }}>
											<Radio value='10:00' label='10:00' />
										</Grid.Col>
										<Grid.Col span={{ base: 3 }}>
											<Radio value='10:00' label='10:00' />
										</Grid.Col>
										<Grid.Col span={{ base: 3 }}>
											<Radio value='10:00' label='10:00' />
										</Grid.Col>
										<Grid.Col span={{ base: 3 }}>
											<Radio value='10:00' label='10:00' />
										</Grid.Col>
									</Grid>
								</Accordion.Panel>
							</Accordion.Item>
						</Accordion>
					</Radio.Group>
					<Flex gap='sm' justify='flex-end' mt='md'>
						<Button variant='default' onClick={close}>
							Annuler
						</Button>
						<Button onClick={onConfirm}>Confirmer</Button>
					</Flex>
				</Stack>
			</Drawer>

			<Button size='xs' onClick={open}>
				Choisir
			</Button>
		</>
	);
};

export { BookingDrawer };

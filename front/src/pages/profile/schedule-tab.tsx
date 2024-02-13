import {
	Accordion,
	ActionIcon,
	Button,
	Flex,
	Stack,
	Tabs,
	Text,
} from '@mantine/core';
import { DAY_NAMES, DAY_NAMES_WORDING } from '../../constants/date';
import { useForm } from '@mantine/form';
import { TimeInput } from '@mantine/dates';
import { IconCalendarX, IconPlus, IconTrash } from '@tabler/icons-react';

const ScheduleTab = () => {
	const form = useForm({
		initialValues: {
			[DAY_NAMES.MONDAY]: [],
			[DAY_NAMES.TUESDAY]: [],
			[DAY_NAMES.WEDNESDAY]: [],
			[DAY_NAMES.THURSDAY]: [],
			[DAY_NAMES.FRIDAY]: [],
			[DAY_NAMES.SATURDAY]: [],
			[DAY_NAMES.SUNDAY]: [],
		},
	});

	const onSave = () => {
		console.log(form.values);
	};

	return (
		<Tabs.Panel value='schedule' py='xl'>
			<Stack gap='sm'>
				<Accordion variant='contained' radius='md'>
					{Object.keys(DAY_NAMES).map((dayName) => (
						<Accordion.Item key={dayName} value={dayName}>
							<Accordion.Control>
								<Text size='sm'>{DAY_NAMES_WORDING[dayName]}</Text>
							</Accordion.Control>
							<Accordion.Panel>
								<Stack gap='xs'>
									{form.values[dayName].length === 0 && (
										<Flex gap='xs' align='center' justify='center'>
											<IconCalendarX size='0.9rem' color='gray' />
											<Text size='sm' c='dimmed'>
												Aucun créneau.
											</Text>
										</Flex>
									)}
									{form.values[dayName].map((_, index) => (
										<Flex key={index} align='flex-end' gap='md'>
											<TimeInput
												label='De'
												placeholder='Start time'
												size='xs'
												flex={1}
												withAsterisk
												{...form.getInputProps(`${dayName}.${index}.startTime`)}
											/>
											<TimeInput
												label='À'
												placeholder='End time'
												size='xs'
												flex={1}
												withAsterisk
												{...form.getInputProps(`${dayName}.${index}.endTime`)}
											/>
											<ActionIcon
												color='red'
												size='md'
												mb={1}
												onClick={() => form.removeListItem(dayName, index)}
											>
												<IconTrash size='1rem' />
											</ActionIcon>
										</Flex>
									))}
								</Stack>

								<Flex justify='flex-end' mt='lg'>
									<Button
										variant='default'
										leftSection={<IconPlus size='1rem' />}
										size='xs'
										onClick={() =>
											form.insertListItem(dayName, {
												startTime: null,
												endTime: null,
											})
										}
									>
										Ajouter
									</Button>
								</Flex>
							</Accordion.Panel>
						</Accordion.Item>
					))}
				</Accordion>

				<Flex justify='flex-end' mt='md' gap='sm'>
					<Button variant='default'>Annuler</Button>
					<Button onClick={onSave}>Enregistrer</Button>
				</Flex>
			</Stack>
		</Tabs.Panel>
	);
};

export { ScheduleTab };

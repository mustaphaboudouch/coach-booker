import {
	Accordion,
	ActionIcon,
	Button,
	Flex,
	Stack,
	Tabs,
	Text,
} from '@mantine/core';
import { DAY_NAMES, DAY_NAMES_WORDING } from '../../../constants/date';
import { useForm, zodResolver } from '@mantine/form';
import { TimeInput } from '@mantine/dates';
import { IconCalendarX, IconPlus, IconTrash } from '@tabler/icons-react';
import { z } from 'zod';
import { USER_ROLES, USER_STATUSES } from '../../../constants/user';
import { QueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';

type Address = {
	country: string;
	city: string;
	zipCode: string;
	address: string;
};

type Period = {
	startTime: string;
	endTime: string;
};

type User = {
	id: string;
	firstname: string;
	lastname: string;
	phoneNumber: string | null;
	status: keyof typeof USER_STATUSES;
	roles: (keyof typeof USER_ROLES)[];
	address: Address;
	schedules: Schedule[];
};

type Schedule = {
	day: keyof typeof DAY_NAMES;
	periods: Period[];
};

type ScheduleTabProps = {
	user: User;
	queryClient: QueryClient;
};

const schema = z.object({
	MONDAY: z.array(
		z
			.object({
				startTime: z
					.string()
					.regex(/^\d{2}:\d{2}$/)
					.refine(
						(time) => {
							const [hours, minutes] = time.split(':').map(Number);
							return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
						},
						{ message: 'Invalid time format' },
					),
				endTime: z
					.string()
					.regex(/^\d{2}:\d{2}$/)
					.refine(
						(time) => {
							const [hours, minutes] = time.split(':').map(Number);
							return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
						},
						{ message: 'Invalid time format' },
					),
			})
			.refine(
				(data) => {
					const start = Number(data.startTime.replace(':', ''));
					const end = Number(data.endTime.replace(':', ''));
					return start < end;
				},
				{
					message: 'End time should be greater than start time',
					path: ['endTime'],
				},
			),
	),
});

function getSchedulePeriods({
	schedules,
	day,
}: {
	schedules: Schedule[];
	day: string;
}) {
	const schedule = schedules.find((schedule) => schedule.day === day);
	return schedule ? schedule.periods : [];
}

function formatSchedulePeriods(data: { [key: string]: Period[] }) {
	return Object.keys(data).map((day) => ({
		day,
		periods: data[day],
	}));
}

const ScheduleTab = ({ user, queryClient }: ScheduleTabProps) => {
	const form = useForm({
		initialValues: {
			[DAY_NAMES.MONDAY]: getSchedulePeriods({
				schedules: user.schedules,
				day: DAY_NAMES.MONDAY,
			}),
			[DAY_NAMES.TUESDAY]: getSchedulePeriods({
				schedules: user.schedules,
				day: DAY_NAMES.TUESDAY,
			}),
			[DAY_NAMES.WEDNESDAY]: getSchedulePeriods({
				schedules: user.schedules,
				day: DAY_NAMES.WEDNESDAY,
			}),
			[DAY_NAMES.THURSDAY]: getSchedulePeriods({
				schedules: user.schedules,
				day: DAY_NAMES.THURSDAY,
			}),
			[DAY_NAMES.FRIDAY]: getSchedulePeriods({
				schedules: user.schedules,
				day: DAY_NAMES.FRIDAY,
			}),
			[DAY_NAMES.SATURDAY]: getSchedulePeriods({
				schedules: user.schedules,
				day: DAY_NAMES.SATURDAY,
			}),
			[DAY_NAMES.SUNDAY]: getSchedulePeriods({
				schedules: user.schedules,
				day: DAY_NAMES.SUNDAY,
			}),
		},
		validate: zodResolver(schema),
	});

	const mutation = useMutation({
		mutationFn: (data: unknown) => {
			return axios.patch(
				`https://pure-wave-60095-4115169081f3.herokuapp.com/api/users/${user.id}/schedule-update`,
				data,
			);
		},
		onError: (error) => {
			console.error(error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] });
			close();
		},
	});

	const onSave = () => {
		const validation = form.validate();
		if (!validation.hasErrors) {
			mutation.mutate({ schedules: formatSchedulePeriods(form.values) });
		}
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
												startTime: '',
												endTime: '',
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

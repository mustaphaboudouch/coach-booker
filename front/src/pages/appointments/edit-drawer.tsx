import { ActionIcon, Button, Drawer, Flex, Group, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import { DateInput, TimeInput } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';

const schema = z
	.object({
		date: z.coerce.date().refine((data) => data > new Date(), {
			message: 'Date must be in the future',
		}),
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
	);

const EditDrawer = () => {
	const [opened, { open, close }] = useDisclosure(false);
	const form = useForm({
		initialValues: {
			date: null,
			startTime: '',
			endTime: '',
		},
		validate: zodResolver(schema),
	});

	const onSave = () => {
		const validation = form.validate();
		if (!validation.hasErrors) {
			console.log('VALUES :', form.values);
		}
	};

	return (
		<>
			<Drawer
				position='right'
				opened={opened}
				onClose={close}
				title='Modifier le rendez-vous'
			>
				<Stack gap='sm'>
					<DateInput
						label='Date'
						placeholder='Date'
						leftSection={<IconCalendar size={16} />}
						{...form.getInputProps('date')}
					/>
					<Group grow>
						<TimeInput label='De' {...form.getInputProps('startTime')} />
						<TimeInput label='À' {...form.getInputProps('endTime')} />
					</Group>
					<Flex gap='sm' justify='flex-end' mt='md'>
						<Button variant='default' onClick={close}>
							Annuler
						</Button>
						<Button onClick={onSave}>Enregistrer</Button>
					</Flex>
				</Stack>
			</Drawer>

			<ActionIcon variant='default' size='md' aria-label='Edit' onClick={open}>
				<IconEdit size='1rem' />
			</ActionIcon>
		</>
	);
};

export { EditDrawer };

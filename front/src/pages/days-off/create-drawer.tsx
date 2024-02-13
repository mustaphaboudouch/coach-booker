import { Button, Drawer, Flex, Stack, Textarea } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconCalendar, IconPlus } from '@tabler/icons-react';
import { z } from 'zod';

const schema = z
	.object({
		startDate: z.coerce.date().refine((data) => data > new Date(), {
			message: 'Start date must be in the future',
		}),
		endDate: z.coerce.date(),
		reason: z.string().min(1),
	})
	.refine((data) => data.endDate > data.startDate, {
		message: 'End date cannot be earlier than start date.',
		path: ['endDate'],
	});

const CreateDrawer = () => {
	const [opened, { open, close }] = useDisclosure(false);
	const form = useForm({
		initialValues: {
			startDate: null,
			endDate: null,
			reason: '',
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
				title='Demander un jour de congé'
			>
				<Stack gap='sm'>
					<DateInput
						label='Date de début'
						placeholder='Date de début'
						leftSection={<IconCalendar size='1rem' />}
						withAsterisk
						{...form.getInputProps('startDate')}
					/>
					<DateInput
						label='Date de fin'
						placeholder='Date de fin'
						leftSection={<IconCalendar size='1rem' />}
						withAsterisk
						{...form.getInputProps('endDate')}
					/>
					<Textarea
						label="Motif de l'absence"
						placeholder="Motif de l'absence"
						rows={5}
						withAsterisk
						{...form.getInputProps('reason')}
					/>
					<Flex gap='sm' justify='flex-end' mt='md'>
						<Button variant='default' onClick={close}>
							Annuler
						</Button>
						<Button onClick={onSave}>Enregister</Button>
					</Flex>
				</Stack>
			</Drawer>

			<Button leftSection={<IconPlus size='1rem' />} onClick={open}>
				Demander un jour de congé
			</Button>
		</>
	);
};

export { CreateDrawer };

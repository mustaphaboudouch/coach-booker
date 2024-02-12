import { ActionIcon, Button, Drawer, Flex, Group, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import { DateInput, TimeInput } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';

const EditDrawer = () => {
	const [opened, { open, close }] = useDisclosure(false);

	const onSave = () => {
		console.log('SAVE');
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
						placeholder='Date du rendez-vous'
						leftSection={<IconCalendar size={16} />}
					/>
					<Group grow>
						<TimeInput label='De' />
						<TimeInput label='À' />
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

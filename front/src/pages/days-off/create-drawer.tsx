import { Button, Drawer, Flex, Stack, Textarea } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { IconCalendar, IconPlus } from '@tabler/icons-react';

const CreateDrawer = () => {
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
				title='Demander un jour de congé'
			>
				<Stack gap='sm'>
					<DateInput
						label='Date de début'
						placeholder='Date de début'
						leftSection={<IconCalendar size='1rem' />}
						withAsterisk
					/>
					<DateInput
						label='Date de fin'
						placeholder='Date de fin'
						leftSection={<IconCalendar size='1rem' />}
						withAsterisk
					/>
					<Textarea
						label="Motif de l'absence"
						placeholder="Motif de l'absence"
						rows={5}
						withAsterisk
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

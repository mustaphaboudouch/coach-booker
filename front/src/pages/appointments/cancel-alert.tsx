import { ActionIcon, Button, Flex, Modal, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCalendarX } from '@tabler/icons-react';

const CancelAlert = () => {
	const [opened, { open, close }] = useDisclosure(false);

	const onCancel = () => {
		console.log('CANCEL');
	};

	return (
		<>
			<Modal opened={opened} onClose={close} title='Annuler le rendez-vous'>
				<Textarea
					label="Raison d'annulation"
					placeholder='Pourquoi voulez-vous annuler ce rendez-vous ?'
				/>
				<Flex mt='xl' gap='sm' justify='flex-end'>
					<Button color='red' onClick={onCancel}>
						Annuler
					</Button>
				</Flex>
			</Modal>

			<ActionIcon
				variant='default'
				size='md'
				aria-label='Reject'
				onClick={open}
			>
				<IconCalendarX size='1rem' />
			</ActionIcon>
		</>
	);
};

export { CancelAlert };

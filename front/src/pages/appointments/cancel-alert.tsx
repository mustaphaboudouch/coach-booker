import { ActionIcon, Button, Flex, Modal, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCalendarX } from '@tabler/icons-react';
import { APPOINTMENT_STATUSES } from '../../constants/appointment';

type CancelAlertProps = {
	appointmentId: string;
};

const CancelAlert = ({ appointmentId }: CancelAlertProps) => {
	const [opened, { open, close }] = useDisclosure(false);

	const onCancel = () => {
		console.log('VALUES :', {
			appointmentId,
			status: APPOINTMENT_STATUSES.CANCELED,
		});
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

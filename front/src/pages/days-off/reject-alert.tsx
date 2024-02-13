import { ActionIcon, Button, Flex, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconX } from '@tabler/icons-react';
import { DAY_OFF_STATUSES } from '../../constants/day-off';

type RejectAlertProps = {
	dayOffId: string;
};

const RejectAlert = ({ dayOffId }: RejectAlertProps) => {
	const [opened, { open, close }] = useDisclosure(false);

	const onReject = () => {
		console.log('VALUES :', { dayOffId, status: DAY_OFF_STATUSES.REJECTED });
	};

	return (
		<>
			<Modal opened={opened} onClose={close} title='Refuser la demande'>
				<Text c='dimmed' size='sm'>
					Êtes-vous sûr de vouloir refuser cette demande de congé ?
				</Text>
				<Flex mt='xl' gap='sm' justify='flex-end'>
					<Button variant='default' onClick={close}>
						Annuler
					</Button>
					<Button color='red' onClick={onReject}>
						Refuser
					</Button>
				</Flex>
			</Modal>

			<ActionIcon
				variant='default'
				size='md'
				aria-label='Reject'
				onClick={open}
			>
				<IconX size='1rem' />
			</ActionIcon>
		</>
	);
};

export { RejectAlert };

import { ActionIcon, Button, Flex, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconX } from '@tabler/icons-react';
import { USER_STATUSES } from '../../constants/user';

type RejectAlertProps = {
	userId: string;
};

const RejectAlert = ({ userId }: RejectAlertProps) => {
	const [opened, { open, close }] = useDisclosure(false);

	const onReject = () => {
		console.log('VALUES :', { userId, status: USER_STATUSES.REJECTED });
	};

	return (
		<>
			<Modal opened={opened} onClose={close} title="Refuser l'utilisateur">
				<Text c='dimmed' size='sm'>
					Êtes-vous sûr de vouloir refuser cet utilisateur ?
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

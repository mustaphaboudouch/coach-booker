import { ActionIcon, Button, Flex, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';
import { DAY_OFF_STATUSES } from '../../constants/day-off';

type DeleteAlertProps = {
	dayOffId: string;
};

const DeleteAlert = ({ dayOffId }: DeleteAlertProps) => {
	const [opened, { open, close }] = useDisclosure(false);

	const onDelete = () => {
		console.log('VALUES :', { dayOffId, status: DAY_OFF_STATUSES.DELETED });
	};

	return (
		<>
			<Modal opened={opened} onClose={close} title='Supprimer la demande'>
				<Text c='dimmed' size='sm'>
					Êtes-vous sûr de vouloir supprimer cette demande de congé ?
				</Text>
				<Flex mt='xl' gap='sm' justify='flex-end'>
					<Button variant='default' onClick={close}>
						Annuler
					</Button>
					<Button color='red' onClick={onDelete}>
						Supprimer
					</Button>
				</Flex>
			</Modal>

			<ActionIcon
				variant='default'
				size='md'
				aria-label='Delete'
				onClick={open}
			>
				<IconTrash size='1rem' />
			</ActionIcon>
		</>
	);
};

export { DeleteAlert };

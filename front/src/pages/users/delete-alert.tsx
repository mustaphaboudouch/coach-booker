import { ActionIcon, Button, Flex, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';
import { USER_STATUSES } from '../../constants/user';

type DeleteAlertProps = {
	userId: string;
};

const DeleteAlert = ({ userId }: DeleteAlertProps) => {
	const [opened, { open, close }] = useDisclosure(false);

	const onDelete = () => {
		console.log('VALUES :', { userId, status: USER_STATUSES.DELETED });
	};

	return (
		<>
			<Modal opened={opened} onClose={close} title="Supprimer l'utilisateur">
				<Text c='dimmed' size='sm'>
					Êtes-vous sûr de vouloir supprimer cet élément ?
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

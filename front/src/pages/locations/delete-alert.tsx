import { ActionIcon, Button, Flex, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';
import { LOCATION_STATUSES } from '../../constants/location';

type DeleteAlertProps = {
	locationId: string;
};

const DeleteAlert = ({ locationId }: DeleteAlertProps) => {
	const [opened, { open, close }] = useDisclosure(false);

	const onDelete = () => {
		console.log('VALUES :', { locationId, status: LOCATION_STATUSES.DELETED });
	};

	return (
		<>
			<Modal opened={opened} onClose={close} title='Supprimer le local'>
				<Text c='dimmed' size='sm'>
					Êtes-vous sûr de vouloir supprimer ce local ?
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

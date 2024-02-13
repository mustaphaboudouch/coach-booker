import { ActionIcon, Button, Flex, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';
import { ORGANISATION_STATUS } from '../../constants/organisation';

type DeleteAlertProps = {
	organisationId: string;
};

const DeleteAlert = ({ organisationId }: DeleteAlertProps) => {
	const [opened, { open, close }] = useDisclosure(false);

	const onDelete = () => {
		console.log('VALUES : ', {
			organisationId,
			status: ORGANISATION_STATUS.DELETED,
		});
	};

	return (
		<>
			<Modal opened={opened} onClose={close} title="Supprimer l'organisation">
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

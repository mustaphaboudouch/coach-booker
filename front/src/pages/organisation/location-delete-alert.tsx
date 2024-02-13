import { ActionIcon, Button, Flex, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';

const LocationDeleteAlert = () => {
	const [opened, { open, close }] = useDisclosure(false);

	const onDelete = () => {
		console.log('DELETE');
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

export { LocationDeleteAlert };
import { ActionIcon, Button, Flex, Modal, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconX } from '@tabler/icons-react';

const RejectAlert = () => {
	const [opened, { open, close }] = useDisclosure(false);

	const onReject = () => {
		console.log('REJECT');
	};

	return (
		<>
			<Modal opened={opened} onClose={close} title='Refuser le rendez-vous'>
				<Textarea
					label='Raison de refus'
					placeholder='Pourquoi voulez-vous refuser ce rendez-vous ?'
				/>
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

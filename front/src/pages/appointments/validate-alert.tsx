import { ActionIcon, Button, Flex, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChecks } from '@tabler/icons-react';
import { APPOINTMENT_STATUSES } from '../../constants/appointment';

type ValidateAlertProps = {
	appointmentId: string;
};

const ValidateAlert = ({ appointmentId }: ValidateAlertProps) => {
	const [opened, { open, close }] = useDisclosure(false);

	const onValidate = () => {
		console.log('VALUES :', {
			appointmentId,
			status: APPOINTMENT_STATUSES.APPROVED,
		});
	};

	return (
		<>
			<Modal opened={opened} onClose={close} title='Valider le rendez-vous'>
				<Text c='dimmed' size='sm'>
					Êtes-vous sûr de vouloir valider ce rendez-vous ?
				</Text>
				<Flex mt='xl' gap='sm' justify='flex-end'>
					<Button variant='default' onClick={close}>
						Annuler
					</Button>
					<Button color='green' onClick={onValidate}>
						Valider
					</Button>
				</Flex>
			</Modal>

			<ActionIcon
				variant='default'
				size='md'
				aria-label='Validate'
				onClick={open}
			>
				<IconChecks size='1rem' />
			</ActionIcon>
		</>
	);
};

export { ValidateAlert };

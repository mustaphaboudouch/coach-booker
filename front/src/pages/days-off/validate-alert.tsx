import { ActionIcon, Button, Flex, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChecks } from '@tabler/icons-react';
import { DAY_OFF_STATUSES } from '../../constants/day-off';

type ValidateAlertProps = {
	dayOffId: string;
};

const ValidateAlert = ({ dayOffId }: ValidateAlertProps) => {
	const [opened, { open, close }] = useDisclosure(false);

	const onValidate = () => {
		console.log('VALUES :', { dayOffId, status: DAY_OFF_STATUSES.APPROVED });
	};

	return (
		<>
			<Modal opened={opened} onClose={close} title='Valider la demande'>
				<Text c='dimmed' size='sm'>
					Êtes-vous sûr de vouloir valider cette demande de congé ?
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

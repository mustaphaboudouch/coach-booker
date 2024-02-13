import { ActionIcon, Button, Flex, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChecks } from '@tabler/icons-react';
import { USER_STATUSES } from '../../constants/user';

type ValidateAlertProps = {
	userId: string;
};

const ValidateAlert = ({ userId }: ValidateAlertProps) => {
	const [opened, { open, close }] = useDisclosure(false);

	const onValidate = () => {
		console.log('VALUES :', { userId, status: USER_STATUSES.ACTIVE });
	};

	return (
		<>
			<Modal opened={opened} onClose={close} title="Valider l'utilisateur">
				<Text c='dimmed' size='sm'>
					Êtes-vous sûr de vouloir valider cet utilisateur ?
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

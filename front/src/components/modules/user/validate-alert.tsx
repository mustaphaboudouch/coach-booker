import { ActionIcon, Button, Flex, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChecks } from '@tabler/icons-react';
import { USER_STATUSES } from '../../../constants/user';
import { UsersRoute } from '../../../pages/users';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type ValidateAlertProps = {
	userId: string;
};

const ValidateAlert = ({ userId }: ValidateAlertProps) => {
	const [opened, { open, close }] = useDisclosure(false);

	const { queryClient } = UsersRoute.useRouteContext();
	const mutation = useMutation({
		mutationFn: (data: { status: string }) => {
			return axios.patch(`https://thawing-inlet-59198-145d5518a749.herokuapp.com//api/users/${userId}`, data);
		},
		onError: (error) => {
			console.error(error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] });
			close();
		},
	});

	const onValidate = () => {
		mutation.mutate({ status: USER_STATUSES.ACTIVE });
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
					<Button
						color='green'
						onClick={onValidate}
						loading={mutation.isPending}
					>
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

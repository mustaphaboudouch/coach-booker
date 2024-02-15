import { ActionIcon, Button, Flex, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconX } from '@tabler/icons-react';
import { USER_STATUSES } from '../../../constants/user';
import { UsersRoute } from '../../../pages/users';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type RejectAlertProps = {
	userId: string;
};

const RejectAlert = ({ userId }: RejectAlertProps) => {
	const [opened, { open, close }] = useDisclosure(false);

	const { queryClient } = UsersRoute.useRouteContext();
	const mutation = useMutation({
		mutationFn: (data: { status: string }) => {
			return axios.patch(`https://pure-wave-60095-4115169081f3.herokuapp.com//api/users/${userId}`, data);
		},
		onError: (error) => {
			console.error(error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] });
			close();
		},
	});

	const onReject = () => {
		mutation.mutate({ status: USER_STATUSES.REJECTED });
	};

	return (
		<>
			<Modal opened={opened} onClose={close} title="Refuser l'utilisateur">
				<Text c='dimmed' size='sm'>
					Êtes-vous sûr de vouloir refuser cet utilisateur ?
				</Text>
				<Flex mt='xl' gap='sm' justify='flex-end'>
					<Button variant='default' onClick={close}>
						Annuler
					</Button>
					<Button color='red' onClick={onReject} loading={mutation.isPending}>
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

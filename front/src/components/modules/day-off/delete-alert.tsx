import { ActionIcon, Button, Flex, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';
import { DAY_OFF_STATUSES } from '../../../constants/day-off';
import { DaysOffRoute } from '../../../pages/days-off';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type DeleteAlertProps = {
	dayOffId: string;
};

const DeleteAlert = ({ dayOffId }: DeleteAlertProps) => {
	const [opened, { open, close }] = useDisclosure(false);

	const { queryClient } = DaysOffRoute.useRouteContext();
	const mutation = useMutation({
		mutationFn: (data: { status: string }) => {
			return axios.patch(
				`https://pure-wave-60095-4115169081f3.herokuapp.com/api/day_offs/${dayOffId}`,
				data,
			);
		},
		onError: (error) => {
			console.error(error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['days_off'] });
			close();
		},
	});

	const onDelete = () => {
		mutation.mutate({ status: DAY_OFF_STATUSES.DELETED });
	};

	return (
		<>
			<Modal opened={opened} onClose={close} title='Supprimer la demande'>
				<Text c='dimmed' size='sm'>
					Êtes-vous sûr de vouloir supprimer cette demande de congé ?
				</Text>
				<Flex mt='xl' gap='sm' justify='flex-end'>
					<Button variant='default' onClick={close}>
						Annuler
					</Button>
					<Button color='red' onClick={onDelete} loading={mutation.isPending}>
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

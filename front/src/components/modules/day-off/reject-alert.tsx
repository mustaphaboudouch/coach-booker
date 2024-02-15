import { ActionIcon, Button, Flex, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconX } from '@tabler/icons-react';
import { DAY_OFF_STATUSES } from '../../../constants/day-off';
import { useMutation } from '@tanstack/react-query';
import { DaysOffRoute } from '../../../pages/days-off';
import axios from 'axios';

type RejectAlertProps = {
	dayOffId: string;
};

const RejectAlert = ({ dayOffId }: RejectAlertProps) => {
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

	const onReject = () => {
		mutation.mutate({ status: DAY_OFF_STATUSES.REJECTED });
	};

	return (
		<>
			<Modal opened={opened} onClose={close} title='Refuser la demande'>
				<Text c='dimmed' size='sm'>
					Êtes-vous sûr de vouloir refuser cette demande de congé ?
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

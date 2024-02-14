import { ActionIcon, Button, Flex, Modal, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconX } from '@tabler/icons-react';
import { APPOINTMENT_STATUSES } from '../../../constants/appointment';
import { useMutation } from '@tanstack/react-query';
import { AppointmentsRoute } from '../../../pages/appointments';
import axios from 'axios';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

type RejectAlertProps = {
	appointmentId: string;
};

const schema = z.object({
	rejectReason: z.string().min(1),
});

const RejectAlert = ({ appointmentId }: RejectAlertProps) => {
	const [opened, { open, close }] = useDisclosure(false);
	const form = useForm({
		initialValues: {
			rejectReason: '',
		},
		validate: zodResolver(schema),
	});

	const { queryClient } = AppointmentsRoute.useRouteContext();
	const mutation = useMutation({
		mutationFn: (data: { status: string }) => {
			return axios.patch(
				`http://127.0.0.1:8000/api/appointments/${appointmentId}`,
				data,
			);
		},
		onError: (error) => {
			console.error(error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['appointments'] });
			close();
		},
	});

	const onReject = () => {
		mutation.mutate({
			status: APPOINTMENT_STATUSES.REJECTED,
			...form.values,
		});
	};

	return (
		<>
			<Modal opened={opened} onClose={close} title='Refuser le rendez-vous'>
				<Textarea
					label='Raison de refus'
					placeholder='Pourquoi voulez-vous refuser ce rendez-vous ?'
					{...form.getInputProps('rejectReason')}
				/>
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

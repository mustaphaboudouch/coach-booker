import { ActionIcon, Button, Flex, Modal, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCalendarX } from '@tabler/icons-react';
import { APPOINTMENT_STATUSES } from '../../../constants/appointment';
import { useMutation } from '@tanstack/react-query';
import { AppointmentsRoute } from '../../../pages/appointments';
import axios from 'axios';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

type CancelAlertProps = {
	appointmentId: string;
};

const schema = z.object({
	cancelReason: z.string().min(1),
});

const CancelAlert = ({ appointmentId }: CancelAlertProps) => {
	const [opened, { open, close }] = useDisclosure(false);
	const form = useForm({
		initialValues: {
			cancelReason: '',
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

	const onCancel = () => {
		mutation.mutate({
			status: APPOINTMENT_STATUSES.CANCELED,
			...form.values,
		});
	};

	return (
		<>
			<Modal opened={opened} onClose={close} title='Annuler le rendez-vous'>
				<Textarea
					label="Raison d'annulation"
					placeholder='Pourquoi voulez-vous annuler ce rendez-vous ?'
					{...form.getInputProps('cancelReason')}
				/>
				<Flex mt='xl' gap='sm' justify='flex-end'>
					<Button variant='default' onClick={close}>
						Annuler
					</Button>
					<Button color='red' onClick={onCancel} loading={mutation.isPending}>
						Annuler le RDV
					</Button>
				</Flex>
			</Modal>

			<ActionIcon
				variant='default'
				size='md'
				aria-label='Reject'
				onClick={open}
			>
				<IconCalendarX size='1rem' />
			</ActionIcon>
		</>
	);
};

export { CancelAlert };

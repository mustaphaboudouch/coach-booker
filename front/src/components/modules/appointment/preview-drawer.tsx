import { ActionIcon, Badge, Drawer, Loader, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEye } from '@tabler/icons-react';
import { DAY_OFF_STATUSES } from '../../../constants/day-off';
import axios from 'axios';
import { ErrorComponent } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

type User = {
	firstname: string;
	lastname: string;
};

type Service = {
	name: string;
};

type Location = {
	name: string;
};

type Appointment = {
	id: string;
	date: string;
	startTime: string;
	endTime: string;
	status: keyof typeof DAY_OFF_STATUSES;
	rejectReason?: string;
	cancelReason?: string;
	service: Service;
	coach: User;
	client: User;
	location: Location;
};

type PreviewDrawerProps = {
	appointmentId: string;
};

const PreviewDrawer = ({ appointmentId }: PreviewDrawerProps) => {
	const [opened, { open, close }] = useDisclosure(false);

	const { data, error, isLoading } = useQuery({
		queryKey: ['appointments', appointmentId],
		queryFn: async () => {
			const { data } = await axios.get(
				`http://127.0.0.1:8000/api/appointments/${appointmentId}`,
			);
			return data;
		},
	});

	if (isLoading) {
		return <Loader size='sm' />;
	}

	if (error) {
		return <ErrorComponent error={error} />;
	}

	const appointment: Appointment = data;

	return (
		<>
			<Drawer position='right' opened={opened} onClose={close}>
				<Stack gap='sm'>
					<table style={{ borderSpacing: '20px' }}>
						<tbody>
							<tr>
								<td valign='top'>
									<Text size='sm' fw={500}>
										Coach
									</Text>
								</td>
								<td valign='top'>
									<Text size='sm' c='dimmed'>
										{`${appointment.coach.firstname} ${appointment.coach.lastname}`}
									</Text>
								</td>
							</tr>
							<tr>
								<td valign='top'>
									<Text size='sm' fw={500}>
										Client
									</Text>
								</td>
								<td valign='top'>
									<Text size='sm' c='dimmed'>
										{`${appointment.client.firstname} ${appointment.client.lastname}`}
									</Text>
								</td>
							</tr>
							<tr>
								<td valign='top'>
									<Text size='sm' fw={500}>
										Service
									</Text>
								</td>
								<td valign='top'>
									<Text size='sm' c='dimmed'>
										{appointment.service.name}
									</Text>
								</td>
							</tr>
							<tr>
								<td valign='top'>
									<Text size='sm' fw={500}>
										Local
									</Text>
								</td>
								<td valign='top'>
									<Text size='sm' c='dimmed'>
										{appointment.location.name}
									</Text>
								</td>
							</tr>
							<tr>
								<td valign='top'>
									<Text size='sm' fw={500}>
										Date
									</Text>
								</td>
								<td valign='top'>
									<Text size='sm' c='dimmed'>
										{appointment.date.toString()}
									</Text>
								</td>
							</tr>
							<tr>
								<td valign='top'>
									<Text size='sm' fw={500}>
										Heure
									</Text>
								</td>
								<td valign='top'>
									<Text size='sm' c='dimmed'>
										{`De ${appointment.startTime} à ${appointment.endTime}`}
									</Text>
								</td>
							</tr>
							<tr>
								<td valign='top'>
									<Text size='sm' fw={500}>
										Statut
									</Text>
								</td>
								<td valign='top'>
									<Text size='sm' c='dimmed'>
										<Badge>{appointment.status}</Badge>
									</Text>
								</td>
							</tr>
							{appointment.cancelReason && (
								<tr>
									<td valign='top'>
										<Text size='sm' fw={500}>
											Raison de l'annulation
										</Text>
									</td>
									<td valign='top'>
										<Text size='sm' c='dimmed'>
											{appointment.cancelReason}
										</Text>
									</td>
								</tr>
							)}
							{appointment.rejectReason && (
								<tr>
									<td valign='top'>
										<Text size='sm' fw={500}>
											Raison de refus
										</Text>
									</td>
									<td valign='top'>
										<Text size='sm' c='dimmed'>
											{appointment.rejectReason}
										</Text>
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</Stack>
			</Drawer>

			<ActionIcon
				variant='default'
				size='md'
				aria-label='Preview'
				onClick={open}
			>
				<IconEye size='1rem' />
			</ActionIcon>
		</>
	);
};

export { PreviewDrawer };

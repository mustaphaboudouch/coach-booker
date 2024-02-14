import { ActionIcon, Badge, Drawer, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEye } from '@tabler/icons-react';
import { DAY_OFF_STATUSES } from '../../../constants/day-off';

type User = {
	firstname: string;
	lastname: string;
};

type DayOff = {
	id: string;
	startDate: Date;
	endDate: Date;
	status: keyof typeof DAY_OFF_STATUSES;
	reason: string;
	user: User;
};

type PreviewDrawerProps = {
	dayOff: DayOff;
};

const PreviewDrawer = ({ dayOff }: PreviewDrawerProps) => {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			<Drawer
				position='right'
				opened={opened}
				onClose={close}
				title='Demande de congé'
			>
				<Stack gap='sm'>
					<table style={{ borderSpacing: '20px' }}>
						<tbody>
							<tr>
								<td valign='top'>
									<Text size='sm' fw={500}>
										Employé
									</Text>
								</td>
								<td valign='top'>
									<Text size='sm' c='dimmed'>
										{`${dayOff.user.firstname} ${dayOff.user.lastname}`}
									</Text>
								</td>
							</tr>
							<tr>
								<td valign='top'>
									<Text size='sm' fw={500}>
										Date de début
									</Text>
								</td>
								<td valign='top'>
									<Text size='sm' c='dimmed'>
										{dayOff.startDate.toString()}
									</Text>
								</td>
							</tr>
							<tr>
								<td valign='top'>
									<Text size='sm' fw={500}>
										Date de fin
									</Text>
								</td>
								<td valign='top'>
									<Text size='sm' c='dimmed'>
										{dayOff.endDate.toString()}
									</Text>
								</td>
							</tr>
							<tr>
								<td valign='top'>
									<Text size='sm' fw={500}>
										Status
									</Text>
								</td>
								<td valign='top'>
									<Badge color='green'>{dayOff.status}</Badge>
								</td>
							</tr>
							<tr>
								<td valign='top'>
									<Text size='sm' fw={500}>
										Motif
									</Text>
								</td>
								<td valign='top'>
									<Text size='sm' c='dimmed'>
										{dayOff.reason}
									</Text>
								</td>
							</tr>
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

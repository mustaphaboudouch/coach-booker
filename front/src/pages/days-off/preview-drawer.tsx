import { ActionIcon, Badge, Drawer, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEye } from '@tabler/icons-react';

const PreviewDrawer = () => {
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
										Prénom Nom
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
										Date de début
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
										Date de fin
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
									<Badge color='green'>Confirmé</Badge>
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
										Lorem ipsum dolor sit amet consectetur adipisicing elit.
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

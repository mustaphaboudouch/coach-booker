import { ActionIcon, Drawer, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEye } from '@tabler/icons-react';

type Service = {
	id: string;
	name: string;
	duration: number;
	price: number;
	description: string;
};

type PreviewDrawerProps = {
	service: Service;
};

const PreviewDrawer = ({ service }: PreviewDrawerProps) => {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			<Drawer
				position='right'
				opened={opened}
				onClose={close}
				title={service.name}
			>
				<Stack gap='sm'>
					<table style={{ borderSpacing: '20px' }}>
						<tbody>
							<tr>
								<td valign='top'>
									<Text size='sm' fw={500}>
										Durée
									</Text>
								</td>
								<td valign='top'>
									<Text size='sm' c='dimmed'>
										{service.duration} min
									</Text>
								</td>
							</tr>
							<tr>
								<td valign='top'>
									<Text size='sm' fw={500}>
										Prix
									</Text>
								</td>
								<td valign='top'>
									<Text size='sm' c='dimmed'>
										{service.price} €
									</Text>
								</td>
							</tr>
							<tr>
								<td valign='top'>
									<Text size='sm' fw={500}>
										Description
									</Text>
								</td>
								<td valign='top'>
									<Text size='sm' c='dimmed'>
										{service.description}
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

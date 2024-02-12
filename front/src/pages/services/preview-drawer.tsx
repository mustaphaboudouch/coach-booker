import { ActionIcon, Drawer, Stack, Text } from '@mantine/core';
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
				title='[Nom du service]'
			>
				<Stack gap='sm'>
					<table style={{ borderSpacing: '20px' }}>
						<tbody>
							<tr>
								<td valign='top'>
									<Text size='sm' fw={500}>
										Nom
									</Text>
								</td>
								<td valign='top'>
									<Text size='sm' c='dimmed'>
										Nom du service
									</Text>
								</td>
							</tr>
							<tr>
								<td valign='top'>
									<Text size='sm' fw={500}>
										Durée
									</Text>
								</td>
								<td valign='top'>
									<Text size='sm' c='dimmed'>
										15 min
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
										150 €
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
										Lorem ipsum dolor sit amet consectetur adipisicing elit.
										Aliquam maiores illum voluptas qui dignissimos officia
										repudiandae fuga hic amet. Dolores obcaecati amet iure
										similique quisquam sint esse debitis possimus veritatis modi
										ad sunt dolore, aperiam est error optio nisi corporis ipsum
										nobis temporibus praesentium iusto ratione.
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

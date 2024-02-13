import {
	ActionIcon,
	Divider,
	Drawer,
	Rating,
	Stack,
	Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEye } from '@tabler/icons-react';

const FeedbacksPreviewDrawer = () => {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			<Drawer position='right' opened={opened} onClose={close}>
				<Stack gap='sm'>
					<table style={{ borderSpacing: '20px' }}>
						<tbody>
							<tr>
								<td valign='top'>
									<Text size='sm' fw={500}>
										Qualité
									</Text>
								</td>
								<td valign='top'>
									<Rating value={3.5} fractions={2} readOnly />
								</td>
							</tr>
							<tr>
								<td valign='top'>
									<Text size='sm' fw={500}>
										Communication
									</Text>
								</td>
								<td valign='top'>
									<Rating value={3.5} fractions={2} readOnly />
								</td>
							</tr>
							<tr>
								<td valign='top'>
									<Text size='sm' fw={500}>
										Expertise
									</Text>
								</td>
								<td valign='top'>
									<Rating value={3.5} fractions={2} readOnly />
								</td>
							</tr>
							<tr>
								<td valign='top'>
									<Text size='sm' fw={500}>
										Disponibilité
									</Text>
								</td>
								<td valign='top'>
									<Rating value={3.5} fractions={2} readOnly />
								</td>
							</tr>
							<tr>
								<td valign='top'>
									<Text size='sm' fw={500}>
										Experience
									</Text>
								</td>
								<td valign='top'>
									<Rating value={3.5} fractions={2} readOnly />
								</td>
							</tr>
							<tr>
								<td colSpan={2}>
									<Divider />
								</td>
							</tr>
							<tr>
								<td valign='top'>
									<Text size='sm' fw={500}>
										Avis total
									</Text>
								</td>
								<td valign='top'>
									<Rating value={3.5} fractions={2} readOnly />
								</td>
							</tr>
							<tr>
								<td valign='top'>
									<Text size='sm' fw={500}>
										Commentaire
									</Text>
								</td>
								<td valign='top'>
									<Text size='sm' c='dimmed'>
										Lorem ipsum dolor sit amet consectetur adipisicing elit.
										Aliquam maiores illum voluptas qui dignissimos officia
										repudiandae fuga hic amet.
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

export { FeedbacksPreviewDrawer };

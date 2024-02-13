import { ActionIcon, Button, Drawer, Flex, Select, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus, IconTrash, IconUsersPlus } from '@tabler/icons-react';

const UsersDrawer = () => {
	const [opened, { open, close }] = useDisclosure(false);
	const form = useForm({
		initialValues: {
			users: [],
		},
	});

	const onSave = () => {
		console.log(form.values);
	};

	return (
		<>
			<Drawer
				position='right'
				opened={opened}
				onClose={close}
				title='Gérer les employés du local'
			>
				<Stack gap='sm'>
					{form.values.users.map((_, index) => (
						<Flex key={index} align='flex-end' gap='md'>
							<Select
								flex={1}
								label={`Utilisateur ${index + 1}`}
								placeholder='Utilisateur'
								data={[
									{
										value: '1',
										label: 'User 1',
									},
									{
										value: '2',
										label: 'User 2',
									},
									{
										value: '3',
										label: 'User 3',
									},
								]}
								withAsterisk
								{...form.getInputProps(`users.${index}`)}
							/>
							<ActionIcon
								color='red'
								size='lg'
								mb={1}
								onClick={() => form.removeListItem('users', index)}
							>
								<IconTrash size='1rem' />
							</ActionIcon>
						</Flex>
					))}

					<Flex justify='flex-end' mt='md'>
						<Button
							variant='default'
							leftSection={<IconPlus size='1rem' />}
							size='xs'
							onClick={() => form.insertListItem('users', null)}
						>
							Ajouter
						</Button>
					</Flex>

					<Flex gap='sm' justify='flex-end' mt='md'>
						<Button variant='default' onClick={close}>
							Annuler
						</Button>
						<Button onClick={onSave}>Enregistrer</Button>
					</Flex>
				</Stack>
			</Drawer>

			<ActionIcon
				variant='default'
				size='md'
				aria-label='Edit users'
				onClick={open}
			>
				<IconUsersPlus size='1rem' />
			</ActionIcon>
		</>
	);
};

export { UsersDrawer };

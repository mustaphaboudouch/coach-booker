import {
	ActionIcon,
	Button,
	Drawer,
	Flex,
	Stack,
	TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { z } from 'zod';
import { OrganisationsRoute } from '../../../pages/organisations';

const schema = z.object({
	name: z.string().min(1),
	kbis: z.string().min(1),
});

type Organisation = {
	id: string;
	name: string;
	kbis: string;
};

type EditDrawerProps = {
	organisation: Organisation;
};

const EditDrawer = ({ organisation }: EditDrawerProps) => {
	const [opened, { open, close }] = useDisclosure(false);
	const form = useForm({
		initialValues: {
			name: organisation.name,
			kbis: organisation.kbis,
		},
		validate: zodResolver(schema),
	});

	const { queryClient } = OrganisationsRoute.useRouteContext();
	const mutation = useMutation({
		mutationFn: (data: { name: string; kbis: string }) => {
			return axios.patch(
				`http://127.0.0.1:8000/api/organisations/${organisation.id}`,
				data,
			);
		},
		onError: (error) => {
			console.error(error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['organisations'] });
			close();
		},
	});

	const onSave = () => {
		const validation = form.validate();
		if (!validation.hasErrors) {
			mutation.mutate(form.values);
		}
	};

	return (
		<>
			<Drawer
				position='right'
				opened={opened}
				onClose={close}
				title="Modifier l'organisation"
				{...form.getInputProps('firstname')}
			>
				<Stack gap='sm'>
					<TextInput
						label='Nom'
						placeholder='Nom'
						{...form.getInputProps('name')}
						withAsterisk
					/>
					<TextInput
						label='KBIS'
						placeholder='KBIS'
						{...form.getInputProps('kbis')}
						withAsterisk
					/>
					<Flex gap='sm' justify='flex-end' mt='md'>
						<Button variant='default' onClick={close}>
							Annuler
						</Button>
						<Button onClick={onSave} loading={mutation.isPending}>
							Enregistrer
						</Button>
					</Flex>
				</Stack>
			</Drawer>

			<ActionIcon variant='default' size='md' aria-label='Edit' onClick={open}>
				<IconEdit size='1rem' />
			</ActionIcon>
		</>
	);
};

export { EditDrawer };

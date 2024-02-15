import { Button, Flex, Stack, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { QueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { z } from 'zod';

const schema = z.object({
	name: z.string().min(1),
	kbis: z.string().min(1),
});

type Organisation = {
	id: string;
	name: string;
	kbis: string;
};

type EditFormProps = {
	organisation: Organisation;
	onSuccess?: () => void;
	onClose?: () => void;
	queryClient: QueryClient;
};

const EditForm = ({
	organisation,
	onSuccess = () => {},
	onClose,
	queryClient,
}: EditFormProps) => {
	const form = useForm({
		initialValues: {
			name: organisation.name,
			kbis: organisation.kbis,
		},
		validate: zodResolver(schema),
	});

	const mutation = useMutation({
		mutationFn: (data: unknown) => {
			return axios.patch(
				`https://pure-wave-60095-4115169081f3.herokuapp.com/api/organisations/${organisation.id}`,
				data,
			);
		},
		onError: (error) => {
			console.error(error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['organisations'] });
			onSuccess();
		},
	});

	const onSave = () => {
		const validation = form.validate();
		if (!validation.hasErrors) {
			mutation.mutate(form.values);
		}
	};

	return (
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
				{onClose && (
					<Button variant='default' onClick={onClose}>
						Annuler
					</Button>
				)}
				<Button onClick={onSave} loading={mutation.isPending}>
					Enregistrer
				</Button>
			</Flex>
		</Stack>
	);
};

export { EditForm };

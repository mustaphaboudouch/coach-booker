import { Button, Flex, Group, Stack, Tabs, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { USER_ROLES, USER_STATUSES } from '../../../constants/user';
import { QueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';

type Address = {
	country: string;
	city: string;
	zipCode: string;
	address: string;
};

type User = {
	id: string;
	firstname: string;
	lastname: string;
	phoneNumber: string | null;
	status: keyof typeof USER_STATUSES;
	roles: (keyof typeof USER_ROLES)[];
	address: Address;
};

type PersonalInfoTabProps = {
	user: User;
	queryClient: QueryClient;
};

const schema = z.object({
	firstname: z.string().min(1),
	lastname: z.string().min(1),
	phoneNumber: z.string().nullish(),
	address: z.object({
		country: z.string().min(1),
		city: z.string().min(1),
		zipCode: z.string().min(1),
		address: z.string().min(1),
	}),
});

const PersonalInfoTab = ({ user, queryClient }: PersonalInfoTabProps) => {
	const form = useForm({
		initialValues: {
			firstname: user.firstname,
			lastname: user.lastname,
			phoneNumber: user.phoneNumber ?? undefined,
			address: {
				country: user.address?.country ?? '',
				city: user.address?.city ?? '',
				zipCode: user.address?.zipCode ?? '',
				address: user.address?.address ?? '',
			},
		},
		validate: zodResolver(schema),
	});

	const mutation = useMutation({
		mutationFn: (data: unknown) => {
			return axios.patch(`http://127.0.0.1:8000/api/users/${user.id}`, data);
		},
		onError: (error) => {
			console.error(error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] });
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
		<Tabs.Panel value='personal-infos' py='xl'>
			<Stack gap='sm'>
				<Group grow>
					<TextInput
						label='Prénom'
						placeholder='Prénom'
						withAsterisk
						{...form.getInputProps('firstname')}
					/>
					<TextInput
						label='Nom'
						placeholder='Nom'
						withAsterisk
						{...form.getInputProps('lastname')}
					/>
				</Group>
				<TextInput
					label='Numéro de téléphone'
					placeholder='Numéro de téléphone'
					{...form.getInputProps('phoneNumber')}
				/>
				<Group grow>
					<TextInput
						label='Pays'
						placeholder='Pays'
						withAsterisk
						{...form.getInputProps('address.country')}
					/>
					<TextInput
						label='Ville'
						placeholder='Ville'
						withAsterisk
						{...form.getInputProps('address.city')}
					/>
				</Group>
				<TextInput
					label='Code postal'
					placeholder='Code postal'
					withAsterisk
					{...form.getInputProps('address.zipCode')}
				/>
				<TextInput
					label='Adresse'
					placeholder='Adresse'
					withAsterisk
					{...form.getInputProps('address.address')}
				/>

				<Flex justify='flex-end' mt='md' gap='sm'>
					<Button variant='default'>Annuler</Button>
					<Button onClick={onSave} loading={mutation.isPending}>
						Enregistrer
					</Button>
				</Flex>
			</Stack>
		</Tabs.Panel>
	);
};

export { PersonalInfoTab };

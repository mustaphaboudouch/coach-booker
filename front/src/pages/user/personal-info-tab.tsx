import { Button, Flex, Group, Stack, Tabs, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

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

const PersonalInfoTab = () => {
	const form = useForm({
		initialValues: {
			firstname: '',
			lastname: '',
			phoneNumber: undefined,
			address: {
				country: '',
				city: '',
				zipCode: '',
				address: '',
			},
		},
		validate: zodResolver(schema),
	});

	const onSave = () => {
		const validation = form.validate();
		if (!validation.hasErrors) {
			console.log('VALUES :', form.values);
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
					<Button onClick={onSave}>Enregistrer</Button>
				</Flex>
			</Stack>
		</Tabs.Panel>
	);
};

export { PersonalInfoTab };

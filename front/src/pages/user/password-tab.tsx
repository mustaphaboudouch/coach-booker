import { Button, Flex, PasswordInput, Stack, Tabs } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

const schema = z
	.object({
		password: z.string().min(6),
		newPassword: z.string().min(6),
		newPasswordConfirm: z.string().min(6),
	})
	.refine((data) => data.newPassword === data.newPasswordConfirm, {
		message: 'Les nouveaux mots de passe ne correspondent pas',
		path: ['newPasswordConfirm'],
	});

const PasswordTab = () => {
	const form = useForm({
		initialValues: {
			password: '',
			newPassword: '',
			newPasswordConfirm: '',
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
		<Tabs.Panel value='password' py='xl'>
			<Stack gap='sm'>
				<PasswordInput
					label='Mot de passe actuel'
					placeholder='Mot de passe actuel'
					{...form.getInputProps('password')}
				/>
				<PasswordInput
					label='Nouveau Mot de passe'
					placeholder='Nouveau Mot de passe'
					{...form.getInputProps('newPassword')}
				/>
				<PasswordInput
					label='Confirmer le nouveau mot de passe'
					placeholder='Confirmer le nouveau mot de passe'
					{...form.getInputProps('newPasswordConfirm')}
				/>
				<Flex justify='flex-end' mt='md' gap='sm'>
					<Button variant='default'>Annuler</Button>
					<Button onClick={onSave}>Enregistrer</Button>
				</Flex>
			</Stack>
		</Tabs.Panel>
	);
};

export { PasswordTab };

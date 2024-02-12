import { Button, Flex, PasswordInput, Stack, Tabs } from '@mantine/core';

const PasswordTab = () => {
	return (
		<Tabs.Panel value='password' py='xl'>
			<Stack gap='sm'>
				<PasswordInput
					label='Mot de passe actuel'
					placeholder='Mot de passe actuel'
				/>
				<PasswordInput
					label='Nouveau Mot de passe'
					placeholder='Nouveau Mot de passe'
				/>
				<PasswordInput
					label='Confirmer le nouveau mot de passe'
					placeholder='Confirmer le nouveau mot de passe'
				/>
				<Flex justify='flex-end' mt='md' gap='sm'>
					<Button variant='default'>Annuler</Button>
					<Button>Enregistrer</Button>
				</Flex>
			</Stack>
		</Tabs.Panel>
	);
};

export { PasswordTab };

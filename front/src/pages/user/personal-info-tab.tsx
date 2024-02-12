import { Button, Flex, Group, Stack, Tabs, TextInput } from '@mantine/core';

const PersonalInfoTab = () => {
	return (
		<Tabs.Panel value='personal-infos' py='xl'>
			<Stack gap='sm'>
				<Group grow>
					<TextInput label='Prénom' placeholder='Prénom' />
					<TextInput label='Nom' placeholder='Nom' />
				</Group>
				<TextInput
					label='Numéro de téléphone'
					placeholder='Numéro de téléphone'
				/>
				<Group grow>
					<TextInput label='Pays' placeholder='Pays' withAsterisk />
					<TextInput label='Ville' placeholder='Ville' withAsterisk />
				</Group>
				<TextInput label='Code postal' placeholder='Code postal' withAsterisk />
				<TextInput label='Adresse' placeholder='Adresse' withAsterisk />

				<Flex justify='flex-end' mt='md' gap='sm'>
					<Button variant='default'>Annuler</Button>
					<Button>Enregistrer</Button>
				</Flex>
			</Stack>
		</Tabs.Panel>
	);
};

export { PersonalInfoTab };

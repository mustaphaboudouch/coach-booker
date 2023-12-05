import { Button, Group, Stack, Tabs, TextInput } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import { FileUploader } from '../../components/ui/file-uploader';

export const PersonalInfoTab = () => {
	return (
		<Tabs.Panel value='personalInfo' py='xl'>
			<form>
				<Stack>
					<FileUploader label='Photo de profil' />
					<Group grow>
						<TextInput label='Prénom' placeholder='Prénom' />
						<TextInput label='Nom' placeholder='Nom' />
					</Group>
					<TextInput
						type='email'
						label='Adresse e-mail'
						placeholder='Adresse e-mail'
						leftSection={<IconAt size='1rem' />}
					/>
					<Button mt='xs' type='submit'>
						Modifier
					</Button>
				</Stack>
			</form>
		</Tabs.Panel>
	);
};

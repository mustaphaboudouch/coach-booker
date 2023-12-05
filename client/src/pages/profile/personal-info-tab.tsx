import { Button, Group, Input, Stack, Tabs, TextInput } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import { FileUploader } from '../../components/ui/file-uploader';

export const PersonalInfoTab = () => {
	return (
		<Tabs.Panel value='personalInfo' py='lg'>
			<form>
				<Stack>
					<FileUploader />
					<Group grow>
						<TextInput label='Prénom' placeholder='Prénom' />
						<TextInput label='Nom' placeholder='Nom' />
					</Group>
					<Input.Wrapper label='Adresse e-mail'>
						<Input
							type='email'
							placeholder='Adresse e-mail'
							leftSection={<IconAt size='1rem' />}
						/>
					</Input.Wrapper>
					<Button mt='xs' type='submit'>
						Modifier
					</Button>
				</Stack>
			</form>
		</Tabs.Panel>
	);
};

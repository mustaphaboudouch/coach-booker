import { Button, PasswordInput, Stack, Tabs } from '@mantine/core';
import { IconLock } from '@tabler/icons-react';

export const PassowordTab = () => {
	return (
		<Tabs.Panel value='password' py='lg'>
			<Stack>
				<PasswordInput
					label='Ancien mot de passe'
					placeholder='Ancien mot de passe'
					leftSection={<IconLock size='1rem' />}
				/>
				<PasswordInput
					label='Nouveau mot de passe'
					placeholder='Nouveau mot de passe'
					leftSection={<IconLock size='1rem' />}
				/>
				<PasswordInput
					label='Confirmer le nouveau mot de passe'
					placeholder='Confirmer le nouveau mot de passe'
					leftSection={<IconLock size='1rem' />}
				/>
				<Button mt='xs'>Modifier</Button>
			</Stack>
		</Tabs.Panel>
	);
};

import { ActionIcon, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import { EditForm } from './edit-form';
import { OrganisationsRoute } from '../../../pages/organisations';

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

	const { queryClient } = OrganisationsRoute.useRouteContext();

	return (
		<>
			<Drawer
				position='right'
				opened={opened}
				onClose={close}
				title="Modifier l'organisation"
			>
				<EditForm
					organisation={organisation}
					onClose={close}
					queryClient={queryClient}
				/>
			</Drawer>

			<ActionIcon variant='default' size='md' aria-label='Edit' onClick={open}>
				<IconEdit size='1rem' />
			</ActionIcon>
		</>
	);
};

export { EditDrawer };

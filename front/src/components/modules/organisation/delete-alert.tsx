import { ActionIcon, Button, Flex, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';
import { ORGANISATION_STATUS } from '../../../constants/organisation';
import { useMutation } from '@tanstack/react-query';
import { OrganisationsRoute } from '../../../pages/organisations';
import axios from 'axios';

type DeleteAlertProps = {
	organisationId: string;
};

const DeleteAlert = ({ organisationId }: DeleteAlertProps) => {
	const [opened, { open, close }] = useDisclosure(false);

	const { queryClient } = OrganisationsRoute.useRouteContext();
	const mutation = useMutation({
		mutationFn: (data: { status: string }) => {
			return axios.patch(
				`https://thawing-inlet-59198-145d5518a749.herokuapp.com//api/organisations/${organisationId}`,
				data,
			);
		},
		onError: (error) => {
			console.error(error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['organisations'] });
			close();
		},
	});

	const onDelete = () => {
		mutation.mutate({ status: ORGANISATION_STATUS.DELETED });
	};

	return (
		<>
			<Modal opened={opened} onClose={close} title="Supprimer l'organisation">
				<Text c='dimmed' size='sm'>
					Êtes-vous sûr de vouloir supprimer cet élément ?
				</Text>
				<Flex mt='xl' gap='sm' justify='flex-end'>
					<Button variant='default' onClick={close}>
						Annuler
					</Button>
					<Button color='red' onClick={onDelete} loading={mutation.isPending}>
						Supprimer
					</Button>
				</Flex>
			</Modal>

			<ActionIcon
				variant='default'
				size='md'
				aria-label='Delete'
				onClick={open}
			>
				<IconTrash size='1rem' />
			</ActionIcon>
		</>
	);
};

export { DeleteAlert };

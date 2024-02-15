import { ActionIcon, Button, Flex, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';
import { LOCATION_STATUSES } from '../../../constants/location';
import { LocationsRoute } from '../../../pages/locations';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type DeleteAlertProps = {
	locationId: string;
};

const DeleteAlert = ({ locationId }: DeleteAlertProps) => {
	const [opened, { open, close }] = useDisclosure(false);

	const { queryClient } = LocationsRoute.useRouteContext();
	const mutation = useMutation({
		mutationFn: (data: { status: string }) => {
			return axios.patch(
				`https://pure-wave-60095-4115169081f3.herokuapp.com/api/locations/${locationId}`,
				data,
			);
		},
		onError: (error) => {
			console.error(error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['locations'] });
			close();
		},
	});

	const onDelete = () => {
		mutation.mutate({ status: LOCATION_STATUSES.DELETED });
	};

	return (
		<>
			<Modal opened={opened} onClose={close} title='Supprimer le local'>
				<Text c='dimmed' size='sm'>
					Êtes-vous sûr de vouloir supprimer ce local ?
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

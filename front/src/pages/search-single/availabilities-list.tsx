import { Accordion, Card, Grid, Loader, Radio, Text } from '@mantine/core';
import axios from 'axios';
import { ErrorComponent } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { UseFormReturnType } from '@mantine/form';

type Slot = {
	startTime: string;
	endTime: string;
};

type Days = {
	day: string;
	slots: Slot[];
};

type AvailabilitiesListProps = {
	userId: string;
	serviceId: string;
	form: UseFormReturnType<{
    time: string;
}, (values: {
    time: string;
}) => {
    time: string;
}>;
};

const AvailabilitiesList = ({
	userId,
	serviceId,
	form,
}: AvailabilitiesListProps) => {
	const { data, error, isLoading } = useQuery({
		queryKey: ['users', userId],
		queryFn: async () => {
			const { data } = await axios.get(
				`https://pure-wave-60095-4115169081f3.herokuapp.com/api/users/${userId}/availabilities/${serviceId}`,
			);
			return data;
		},
	});

	if (isLoading) {
		return <Loader />;
	}

	if (error) {
		return <ErrorComponent error={error} />;
	}

	const days: Days[] = data;

	if (days.length === 0) {
		return (
			<Card withBorder radius='md'>
				<Text size='sm' c='dimmed' ta='center'>
					Aucune disponibilité.
				</Text>
			</Card>
		);
	}

	return (
		<Radio.Group label='Heure' withAsterisk {...form.getInputProps('time')}>
			<Accordion variant='contained'>
				{days.map((day, index) => (
					<Accordion.Item value={day.day} key={index}>
						<Accordion.Control>
							<Text size='sm' c='dimmed'>
								{day.day}
							</Text>
						</Accordion.Control>
						<Accordion.Panel>
							<Grid>
								{day.slots.length === 0 && (
									<Grid.Col span={{ base: 12 }}>
										<Text size='sm' c='dimmed'>
											Indisponible
										</Text>
									</Grid.Col>
								)}
								{day.slots.map((slot, i) => (
									<Grid.Col span={{ base: 6 }} key={i}>
										<Radio
											value={`${day.day}|${slot.startTime}|${slot.endTime}`}
											label={`${slot.startTime} - ${slot.endTime}`}
										/>
									</Grid.Col>
								))}
							</Grid>
						</Accordion.Panel>
					</Accordion.Item>
				))}
			</Accordion>
		</Radio.Group>
	);
};

export { AvailabilitiesList };

import { Card, Divider, Flex } from '@mantine/core';
import { StatsCard, StatsCardProps } from './stats-card';

type StatsGridProps = {
	stats: StatsCardProps[];
};

const StatsGrid = ({ stats }: StatsGridProps) => {
	return (
		<Card radius='md' withBorder>
			<Flex>
				{stats.map((stat, index) => (
					<>
						<StatsCard key={index} {...stat} />
						{index < stats.length - 1 && (
							<Divider orientation='vertical' mx='md' />
						)}
					</>
				))}
			</Flex>
		</Card>
	);
};

export { StatsGrid };

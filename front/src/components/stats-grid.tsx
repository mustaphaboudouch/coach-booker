import { Card, Divider, Flex } from '@mantine/core';
import { StatsCard, StatsCardProps } from './stats-card';
import React from 'react';

type StatsGridProps = {
	stats: StatsCardProps[];
};

const StatsGrid = ({ stats }: StatsGridProps) => {
	return (
		<Card radius='md' withBorder>
			<Flex>
				{stats.map((stat, index) => (
					<React.Fragment key={index}>
						<StatsCard {...stat} />
						{index < stats.length - 1 && (
							<Divider orientation='vertical' mx='md' />
						)}
					</React.Fragment>
				))}
			</Flex>
		</Card>
	);
};

export { StatsGrid };

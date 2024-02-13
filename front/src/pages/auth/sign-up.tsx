import { Button, Card, Group, Image, Stack } from '@mantine/core';
import { Link, createRoute } from '@tanstack/react-router';
import { AuthLayoutRoute } from '../../layouts/auth-layout';
import { PageHeader } from '../../components/page-header';

type SignUpCardProps = {
	buttonLabel: string;
	image: string;
	link: string;
};

const SignUpCard = ({ buttonLabel, image, link }: SignUpCardProps) => {
	return (
		<Card padding='lg' radius='md' withBorder>
			<Card.Section>
				<Image src={image} height={160} alt={buttonLabel} />
			</Card.Section>
			<Button mt='md' fullWidth component={Link} to={link}>
				{buttonLabel}
			</Button>
		</Card>
	);
};

const SignUp = () => {
	return (
		<Stack>
			<PageHeader title="S'inscrire" />

			<Group grow>
				<SignUpCard
					buttonLabel='Je suis un coach'
					image='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'
					link='/sign-up/coach'
				/>
				<SignUpCard
					buttonLabel='Je suis un client'
					image='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'
					link='/sign-up/client'
				/>
			</Group>
		</Stack>
	);
};

const SignUpRoute = createRoute({
	getParentRoute: () => AuthLayoutRoute,
	path: '/sign-up',
	component: SignUp,
});

export { SignUpRoute };

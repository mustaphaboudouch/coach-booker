import { Button, Card, Group, Image } from '@mantine/core';
import { AuthLayout } from '../components/layout';
import { Link } from 'react-router-dom';

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

export const SignUp = () => {
	return (
		<AuthLayout title="S'inscrire">
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
		</AuthLayout>
	);
};

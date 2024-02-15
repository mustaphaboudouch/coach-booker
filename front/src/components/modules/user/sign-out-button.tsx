import { Button } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { useNavigate } from '@tanstack/react-router';

const SignOutButton = () => {
	const navigate = useNavigate();
	const [,, removeValue] = useLocalStorage({
		key: 'jwt-token',
	});

	return (
		<Button
			onClick={() => {
				removeValue();
				navigate({ to: '/' });
				window.location.reload();
			}}
		>
			Se déconnecter
		</Button>
	);
};

export { SignOutButton };

import { useQuery } from '@tanstack/react-query';
import { RouterProvider as TanstackRouterProvider } from '@tanstack/react-router';
import { router } from './router';
import axios from 'axios';
import { Loader } from '@mantine/core';
import { USER_ROLES } from '../constants/user';
import { useLocalStorage } from '@mantine/hooks';

type DBUser = {
	id: string;
	firstname: string;
	lastname: string;
	roles: (keyof typeof USER_ROLES)[];
	organization: {
		id: string;
	};
};

const AuthProvider = () => {
	const [value] = useLocalStorage({
		key: 'jwt-token',
	});

	const { data, error, isLoading } = useQuery({
		queryKey: ['me'],
		queryFn: async () => {
			const { data } = await axios.get(`https://pure-wave-60095-4115169081f3.herokuapp.com/api/me`, {
				headers: {
					Authorization: 'Bearer ' + value,
				},
			});
			return data;
		},
		enabled: !!value,
		retry: 1,
	});

	console.log(error);

	if (isLoading) {
		return <Loader />;
	}

	const user: DBUser = data;

	return (
		<TanstackRouterProvider
			router={router}
			defaultPreload='intent'
			context={{
				user:
					!user || error
						? undefined
						: {
								id: user.id,
								firstname: user.firstname,
								lastname: user.lastname,
								role: user.roles[0],
								organizationId: user.organization?.id,
								// eslint-disable-next-line no-mixed-spaces-and-tabs
						  },
			}}
		/>
	);
};

export { AuthProvider };

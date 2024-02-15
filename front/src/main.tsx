import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { RouterProvider, router } from './router';
import { Notifications } from '@mantine/notifications';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/notifications/styles.css';

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<MantineProvider>
			<Notifications limit={5} position='top-right' />
			<RouterProvider />
		</MantineProvider>
	</React.StrictMode>,
);

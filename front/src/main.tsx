import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { RouterProvider, router } from './router';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<MantineProvider>
			<RouterProvider />
		</MantineProvider>
	</React.StrictMode>,
);

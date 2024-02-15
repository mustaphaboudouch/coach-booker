import React from 'react';
import { useRouteContext } from '@tanstack/react-router';

type ProtectedFragmentProps = {
	children: React.ReactNode;
	roles: string[];
};

const ProtectedFragment = ({ children, roles }: ProtectedFragmentProps) => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const { user: me } = useRouteContext('/app-layout');

	if (!me || (me && !roles.includes(me.role))) return null;

	return <>{children}</>;
};

export { ProtectedFragment };

import type { FC } from 'react';
import { Router } from 'wouter';

export const withRouter = (Component: FC) => () => {
	return (
		<Router>
			<Component />
		</Router>
	);
};

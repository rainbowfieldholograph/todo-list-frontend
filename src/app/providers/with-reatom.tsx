import { FC } from 'react';
import { reatomContext } from '@reatom/npm-react';
import { reatomCtx } from 'shared/config/reatom-ctx';

export const withReatom = (Component: FC) => () => {
	return (
		<reatomContext.Provider value={reatomCtx}>
			<Component />
		</reatomContext.Provider>
	);
};

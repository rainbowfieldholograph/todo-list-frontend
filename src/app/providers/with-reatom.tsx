import { connectLogger, createCtx } from '@reatom/framework';
import { reatomContext } from '@reatom/npm-react';
import { FC } from 'react';

const ctx = createCtx();
connectLogger(ctx);

export const withReatom = (Component: FC) => () => {
	return (
		<reatomContext.Provider value={ctx}>
			<Component />
		</reatomContext.Provider>
	);
};

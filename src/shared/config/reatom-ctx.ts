import { connectLogger, createCtx } from '@reatom/framework';

export const reatomCtx = createCtx();
connectLogger(reatomCtx);

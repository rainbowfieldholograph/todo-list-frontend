import compose from 'compose-function';
import { withReatom } from './with-reatom';
import { withRouter } from './with-router';

export const withProviders = compose(withReatom, withRouter);

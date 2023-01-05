import compose from 'compose-function';
import { withReatom } from './withReatom';
import { withRouter } from './withRouter';

export const withProviders = compose(withReatom, withRouter);

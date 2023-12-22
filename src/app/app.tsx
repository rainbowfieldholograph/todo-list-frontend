import type { FC } from 'react';
import { Routing } from '../pages';
import { withProviders } from './providers';
import './styles/base.css';
import './styles/variables.css';

const AppComponent: FC = () => {
	return <Routing />;
};

export const App = withProviders(AppComponent);

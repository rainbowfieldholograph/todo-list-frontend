import { apiInstance } from 'shared/api';
import { reatomCtx } from 'shared/config/reatom-ctx';
import { tokenAtom } from '../model';

apiInstance.interceptors.request.use((config) => {
	config.headers.Authorization = `bearer ${reatomCtx.get(tokenAtom)}`;

	return config;
});

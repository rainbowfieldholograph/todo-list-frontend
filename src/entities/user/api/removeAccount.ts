import { apiInstance } from 'shared/api';

export const removeAccount = async () => {
	await apiInstance.delete('/user/me');
};

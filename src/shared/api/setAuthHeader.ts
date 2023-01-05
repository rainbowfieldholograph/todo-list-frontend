import { apiInstance } from './base';

export const setAuthHeader = (token: string) => {
  apiInstance.defaults.headers.common['Authorization'] = `bearer ${token}`;
};

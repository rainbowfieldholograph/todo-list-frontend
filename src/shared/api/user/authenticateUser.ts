import { apiInstance } from '../base';

export interface AuthenticationBody {
  email: string;
  password: string;
}

interface Response {
  accessToken: string;
}

export const authenticateUser = async (body: AuthenticationBody) => {
  return apiInstance.post<Response>('/user/login', body);
};

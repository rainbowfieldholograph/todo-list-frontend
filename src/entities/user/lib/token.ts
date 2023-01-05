import { storage } from 'shared/lib/storage';

const TOKEN_KEY = 'token';

export const saveToken = (token: string) => {
  storage.set(TOKEN_KEY, token);
};

export const getToken = () => {
  const token = storage.get<string | null | undefined>(TOKEN_KEY);
  return token;
};

export const clearToken = () => {
  storage.remove(TOKEN_KEY);
};

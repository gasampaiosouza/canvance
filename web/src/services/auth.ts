import { IUser } from '@/interfaces';
import api from './api';

interface SignInRequestData {
  email: string;
  password: string;
}

interface SignInResponse {
  user: IUser;
  token: string;
}

export async function signInRequest(data: SignInRequestData) {
  const response = await api.post<SignInResponse>('/auth/login', data);

  return response.data;
}

export async function recoverUserInformation(token: string) {
  api.defaults.headers['Authorization'] = `Bearer ${token}`;

  const response = await api.get<IUser>(`/user/profile`);

  return response.data;
}

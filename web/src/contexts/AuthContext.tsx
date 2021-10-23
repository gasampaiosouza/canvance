import { recoverUserInformation, signInRequest } from 'services/auth';
import { createContext } from 'react';

import Router from 'next/router';

import { setCookie, parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import { IUser } from '@/interfaces';
import api from 'services/api';

interface SignInData {
  email: string;
  password: string;
}

interface AuthContextData {
  user: IUser | null;
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'canvance.token': token } = parseCookies();

    if (!token) return;

    recoverUserInformation(token).then((response) => setUser(response.user));
  }, []);

  async function signIn(data: SignInData) {
    const { email, password } = data;
    const { token, user } = await signInRequest({ email, password });

    setCookie(undefined, 'canvance.token', token, {
      maxAge: 60 * 60 * 48, // 48 hours - 2 days
    });

    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    setUser(user);

    Router.push('/dashboard');
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

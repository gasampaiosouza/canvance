import { IUser } from '@/interfaces';
import Router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { useCallback, useEffect, useState } from 'react';
import api from 'services/api';
import { recoverUserInformation, signInRequest } from 'services/auth';
import { createContext } from 'use-context-selector';

interface SignInData {
  email: string;
  password: string;
}

interface AuthContextData {
  user: IUser | null;
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<{ error: unknown } | undefined>;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'canvance.token': token } = parseCookies();

    if (!token) return;

    recoverUserInformation(token).then((response) => setUser(response));
  }, []);

  const signIn = useCallback(async (data: SignInData) => {
    const { email, password } = data;

    try {
      const { token, user } = await signInRequest({ email, password });

      setCookie(undefined, 'canvance.token', token, {
        maxAge: 60 * 60 * 24, // 24 hours - 1 day
      });

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      setUser(user);

      // Router.push('/dashboard');

      return { user, error: null };
    } catch (error) {
      console.log('context', error);

      return { user: null, error };
    }
  }, []);

  const signOut = () => {
    destroyCookie(undefined, 'canvance.token');
    Router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

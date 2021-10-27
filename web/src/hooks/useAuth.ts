import { AuthContext } from 'contexts/AuthContext';
import { useContextSelector as ctxSelector } from 'use-context-selector';

export function useAuth() {
  const user = ctxSelector(AuthContext, (c) => c.user);
  const isAuthenticated = ctxSelector(AuthContext, (c) => c.isAuthenticated);
  const signIn = ctxSelector(AuthContext, (c) => c.signIn);
  const signOut = ctxSelector(AuthContext, (c) => c.signOut);

  return { user, isAuthenticated, signIn, signOut };
}

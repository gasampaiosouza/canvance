import { UsersContext } from 'contexts/UserContext';
import { useContextSelector as ctxSelector } from 'use-context-selector';

export function useUserList() {
  const allUsers = ctxSelector(UsersContext, (c) => c.allUsers);
  const mutateUsers = ctxSelector(UsersContext, (c) => c.mutateUsers);

  return {
    allUsers,
    mutateUsers,
  };
}

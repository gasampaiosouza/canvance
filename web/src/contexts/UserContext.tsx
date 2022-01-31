import { IUser } from '@/interfaces';
import { useFetch } from 'hooks/useFetch';
import { KeyedMutator } from 'swr';
import { createContext } from 'use-context-selector';

interface UsersContextData {
  allUsers: IUser[];

  mutateUsers: KeyedMutator<IUser[]>;
}

export const UsersContext = createContext({} as UsersContextData);

export const UsersProvider: React.FC = ({ children }) => {
  const { data: users, mutate: mutateUsers } = useFetch<IUser[]>('/users');

  return (
    <UsersContext.Provider
      value={{
        allUsers: users || [],
        mutateUsers,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

import { ICategory } from '@/interfaces';
import { useAuth } from 'hooks/useAuth';
import { useFetch } from 'hooks/useFetch';
import { KeyedMutator } from 'swr';
import { createContext } from 'use-context-selector';

interface CategoriesContextData {
  allCategories: ICategory[];
  // addNewUser: (userId: string) => void;
  // removeUser: (userId: string) => void;

  mutateCategories: KeyedMutator<ICategory[]>;
}

export const CategoriesContext = createContext({} as CategoriesContextData);

export const CategoriesProvider: React.FC = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <>{children}</>;

  const { data: users, mutate: mutateCategories } = useFetch<ICategory[]>('/category');
  // const { data: tasks, mutate: mutateTasks } = useFetch<ITask[]>(tasksUrl);

  // const addNewUser = useCallback(
  //   async (userId: string) => {
  //     try {
  //       const newUser = { newUser: userId, userId: user?._id, status: 'done' };
  //       const { data } = await api.post<ITaskDone>('/tasks-done', newUser);

  //       const filteredTasks = users?.filter((task) => task._id !== userId);
  //       const mutatedTasks = [
  //         { ...data.newUser, status: 'done' },
  //         ...(filteredTasks || []),
  //       ];

  //       mutateTasks(mutatedTasks as ITask[], false);

  //       toast.success('Tarefa finalizada!');
  //     } catch (error: any) {
  //       console.log(error);
  //       toast.error('Ocorreu um erro ao finalizar a tarefa.');
  //     }
  //   },
  //   [tasks, mutateTasks, user]
  // );

  // async function removeTask(userId: string) {
  //   try {
  //     await api.delete(`/tasks-done/${userId}`);

  //     const deletedTask = tasks?.find((task) => task._id === userId);
  //     const mutatedTasks = [
  //       omit(deletedTask, 'status'),
  //       ...(tasks?.filter((task) => task._id !== userId) || []),
  //     ];

  //     mutateTasks(mutatedTasks, false);

  //     toast.success('Tarefa desfeita!');
  //   } catch (error) {
  //     console.log(error);
  //     toast.error('Ocorreu um erro ao desfazer a tarefa!');
  //   }

  //   return;
  // }

  return (
    <CategoriesContext.Provider
      value={{
        allCategories: users || [],
        mutateCategories,
        // addNewUser,
        // removeTask,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

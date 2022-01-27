import { ITaskDone, ITask } from '@/interfaces';
import { useCallback } from 'react';
import api from 'services/api';
import { useAuth } from 'hooks/useAuth';
import { createContext } from 'use-context-selector';
import { omit } from 'lodash';
import { sortTasksByRelevance } from 'helpers/sort-tasks-by-relevance';
import { toast } from 'react-toastify';
import { useFetch } from 'hooks/useFetch';
import { KeyedMutator, useSWRConfig } from 'swr';
// import { useTasks } from 'hooks/useTasks';

interface TasksContextData {
  allTasks: ITask[];
  userTasks: ITask[];
  addNewTask: (taskId: string) => void;
  removeTask: (taskId: string) => void;

  mutateTasks: KeyedMutator<ITask[]>;
}

export const TasksContext = createContext({} as TasksContextData);

export const TasksProvider: React.FC = ({ children }) => {
  const { mutate } = useSWRConfig();
  const { user } = useAuth();

  if (!user) return <>{children}</>;

  // const userCategories = user?.category.map((category) => category._id).join(',');
  const { data: tasks, mutate: mutateTasks } = useFetch<ITask[]>('/tasks', {
    revalidateOnMount: true,
  });
  const { data: userTasks } = useFetch<ITask[]>('/user/tasks');

  const addNewTask = useCallback(
    async (taskId: string) => {
      try {
        const newTask = { newTask: taskId, userId: user?._id, status: 'done' };
        const { data } = await api.post<ITaskDone>('/tasks-done', newTask);

        const filteredTasks = tasks?.filter((task) => task._id !== taskId);
        const mutatedTasks = [
          { ...data.newTask, status: 'done' },
          ...(filteredTasks || []),
        ];

        mutateTasks(mutatedTasks as ITask[], false);
        mutate('/user/tasks');

        toast.success('Tarefa finalizada!');
      } catch (error: any) {
        console.log(error);
        toast.error('Ocorreu um erro ao finalizar a tarefa.');
      }
    },
    [tasks, mutateTasks, user]
  );

  async function removeTask(taskId: string) {
    try {
      await api.delete(`/tasks-done/${taskId}`);

      const deletedTask = tasks?.find((task) => task._id === taskId);
      const mutatedTasks = [
        omit(deletedTask, 'status'),
        ...(tasks?.filter((task) => task._id !== taskId) || []),
      ];

      mutateTasks(mutatedTasks, true);
      mutate('/user/tasks');

      toast.success('Tarefa desfeita!');
    } catch (error) {
      console.log(error);
      toast.error('Ocorreu um erro ao desfazer a tarefa!');
    }

    return;
  }

  return (
    <TasksContext.Provider
      value={{
        allTasks: tasks || [],
        userTasks: sortTasksByRelevance(userTasks || []),
        mutateTasks,
        addNewTask,
        removeTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

import { ITaskDone, ITask } from '@/interfaces';
import { useCallback } from 'react';
import api from 'services/api';
import { useAuth } from 'hooks/useAuth';
import { createContext } from 'use-context-selector';
import { omit } from 'lodash';
import { sortTasksByRelevance } from 'helpers/sort-tasks-by-relevance';
import { toast } from 'react-toastify';
import { useFetch } from 'hooks/useFetch';
import { KeyedMutator } from 'swr';
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
  const { user } = useAuth();

  const tasksUrl = `/tasks/category/${user?.category._id}`;
  const { data: tasks, mutate: mutateTasks } = useFetch<ITask[]>(tasksUrl);

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

      mutateTasks(mutatedTasks, false);

      toast.success('Tarefa desfeita!');
    } catch (error) {
      console.log(error);
      toast.error('Ocorreu um erro ao desfazer a tarefa!');
    }

    return;
  }

  // filter by user category
  const userTasks = sortTasksByRelevance(tasks || []).filter(
    (task) => task.category._id === user?.category._id
  );

  return (
    <TasksContext.Provider
      value={{
        allTasks: tasks || [],
        userTasks,
        mutateTasks,
        addNewTask,
        removeTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export function useTaskList() {}

import { ITaskDone, ITask } from '@/interfaces';
import { useEffect, useState } from 'react';
import api from 'services/api';
import { useAuth } from 'hooks/useAuth';
import { createContext } from 'use-context-selector';
import { omit } from 'lodash';
import { sortTasksByRelevance } from 'helpers/sort-tasks-by-relevance';
import { toast } from 'react-toastify';

interface TasksContextData {
  userTasks: ITask[];
  finishedTasks: ITask[];
  addNewTask: (taskId: string) => Promise<void>;
  removeTask: (taskId: string) => Promise<void>;
}

export const TasksContext = createContext({} as TasksContextData);

export const TasksProvider: React.FC = ({ children }) => {
  const [userTasks, setUserTasks] = useState<ITask[]>([]);
  const { user, isAuthenticated } = useAuth();

  // console.log(userTasks);

  const finishedTasks = userTasks.filter((task) => task.status == 'done');

  async function addNewTask(taskId: string) {
    try {
      const { data } = await api.post<ITaskDone>('/tasks-done', {
        taskId,
        userId: user?._id,
        status: 'done',
      });

      // console.log({ newTask: { ...data.taskId, status: 'done' } });

      setUserTasks((tasks) => [
        ...tasks.filter((task) => task._id !== taskId),
        { ...data.taskId, status: 'done' },
      ]);
    } catch (error: any) {
      console.log(error);
    }
  }

  async function removeTask(taskId: string) {
    try {
      await api.delete(`/tasks-done/${taskId}`);

      setUserTasks((tasks) => {
        const deletedTask = tasks.find((task) => task._id === taskId);

        return [
          omit(deletedTask, 'status'),
          ...tasks.filter((task) => task._id !== taskId),
        ];
      });
    } catch (error) {
      console.log(error);
    }

    return;
  }

  useEffect(() => {
    if (!isAuthenticated) return;

    async function getTasks() {
      try {
        const response = await api.get<ITask[]>(`/tasks/category/${user?.category._id}`);

        setUserTasks(response.data || []);
      } catch (error) {
        console.log(error);
        toast.error('Erro ao carregar tarefas');
      }
    }

    getTasks();
  }, [isAuthenticated]);

  // status e relevance
  // TODO: sort tasks by relevance and status == done
  const sortedUserTasks = sortTasksByRelevance(userTasks);

  return (
    <TasksContext.Provider
      value={{ userTasks: sortedUserTasks, finishedTasks, addNewTask, removeTask }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export function useTaskList() {}

import { ITasks } from '@/interfaces';
import { useEffect, useState } from 'react';
import api from 'services/api';
import { useAuth } from './useAuth';

export function useTaskList() {
  const [userTasks, setUserTasks] = useState<ITasks[]>([]);
  const { user, isAuthenticated } = useAuth();

  const finishedTasks = userTasks.filter((task) => task.status == 'done');

  useEffect(() => {
    if (!isAuthenticated) return;

    async function getTasks() {
      const response = await api.get<ITasks[]>(
        `/tasks/category/${user?.category._id}`
      );

      setUserTasks(response.data || []);
    }

    try {
      getTasks();
    } catch (error) {
      console.log(error);
    }
  }, [isAuthenticated]);

  return { userTasks, finishedTasks };
}

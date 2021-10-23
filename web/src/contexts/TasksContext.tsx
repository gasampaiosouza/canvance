import { createContext } from 'react';
import useFetch from 'hooks/useFetch';
import { ITasks } from '@/interfaces';

interface TasksContextData {
  tasksList: ITasks[];
  tasksDone: ITasks[];
}

export const TasksContext = createContext({} as TasksContextData);

export const TasksProvider: React.FC = ({ children }) => {
  const { data: tasksList } = useFetch<ITasks[]>('/tasks');

  const tasksDone = tasksList?.filter((task) => task.completed) || [];

  // const anyNewFunction = useCallback(() => {}, []);

  return (
    <TasksContext.Provider value={{ tasksList: tasksList || [], tasksDone }}>
      {children}
    </TasksContext.Provider>
  );
};

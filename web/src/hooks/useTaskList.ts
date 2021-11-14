import { TasksContext } from 'contexts/TaskContext';
import { useContextSelector as ctxSelector } from 'use-context-selector';

export function useTaskList() {
  const userTasks = ctxSelector(TasksContext, (c) => c.userTasks);
  const finishedTasks = ctxSelector(TasksContext, (c) => c.finishedTasks);
  const addNewTask = ctxSelector(TasksContext, (c) => c.addNewTask);
  const removeTask = ctxSelector(TasksContext, (c) => c.removeTask);

  return { userTasks, finishedTasks, addNewTask, removeTask };
}

// import { ITaskDone, ITasks } from '@/interfaces';
// import { useEffect, useState } from 'react';
// import api from 'services/api';
// import { useAuth } from './useAuth';

// export function useTaskList() {
//   const [userTasks, setUserTasks] = useState<ITasks[]>([]);
//   const { user, isAuthenticated } = useAuth();

//   const finishedTasks = userTasks.filter((task) => task.status == 'done');

//   async function addNewTask(taskId: string) {
//     try {
//       const { data } = await api.post<ITaskDone>('/tasks-done', {
//         taskId,
//         userId: user?._id,
//         status: 'done',
//       });

//       // console.log({ newTask: { ...data.taskId, status: 'done' } });

//       setUserTasks((tasks) => [
//         ...tasks.filter((task) => task._id !== taskId),
//         { ...data.taskId, status: 'done' },
//       ]);
//     } catch (error: any) {
//       console.log(error);
//     }
//   }

//   async function removeTask(taskId: string) {
//     try {
//       await api.delete(`/tasks-done/${taskId}`);

//       setUserTasks((tasks) => {
//         console.log({ deletedTask: tasks.filter((task) => task._id !== taskId) });

//         return tasks.filter((task) => task._id !== taskId);
//       });
//     } catch (error) {
//       console.log(error);
//     }

//     return;
//   }

//   useEffect(() => {
//     if (!isAuthenticated) return;

//     async function getTasks() {
//       const response = await api.get<ITasks[]>(`/tasks/category/${user?.category._id}`);

//       setUserTasks(response.data || []);
//     }

//     try {
//       getTasks();
//     } catch (error) {
//       console.log(error);
//     }
//   }, [isAuthenticated]);

//   return { userTasks, finishedTasks, addNewTask, removeTask };
// }

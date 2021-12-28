import { TasksContext } from 'contexts/TaskContext';
import { useContextSelector as ctxSelector } from 'use-context-selector';

export function useTaskList() {
  const allTasks = ctxSelector(TasksContext, (c) => c.allTasks);
  const userTasks = ctxSelector(TasksContext, (c) => c.userTasks);
  const mutateTasks = ctxSelector(TasksContext, (c) => c.mutateTasks);
  // const finishedTasks = ctxSelector(TasksContext, (c) => c.finishedTasks);
  const addNewTask = ctxSelector(TasksContext, (c) => c.addNewTask);
  const removeTask = ctxSelector(TasksContext, (c) => c.removeTask);

  return {
    allTasks,
    userTasks,
    mutateTasks,
    // finishedTasks,
    addNewTask,
    removeTask,
  };
}

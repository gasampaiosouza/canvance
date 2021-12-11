import { TasksContext } from 'contexts/TaskContext';
import { useContextSelector as ctxSelector } from 'use-context-selector';

export function useTaskList() {
  const userTasks = ctxSelector(TasksContext, (c) => c.userTasks);
  const finishedTasks = ctxSelector(TasksContext, (c) => c.finishedTasks);
  const addNewTask = ctxSelector(TasksContext, (c) => c.addNewTask);
  const removeTask = ctxSelector(TasksContext, (c) => c.removeTask);

  return { userTasks, finishedTasks, addNewTask, removeTask };
}

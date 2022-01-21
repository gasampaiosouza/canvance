import React from 'react';
import { TaskCompletedStatus, TaskContentContainer } from './styles';

import Moment from 'react-moment';
import { ITask, ITaskDone } from '@/interfaces';
import { useFetch } from 'hooks/useFetch';

import { Close } from '@styled-icons/material-rounded';
import { useTaskList } from 'hooks/useTaskList';
import { useSWRConfig } from 'swr';
import { useRouter } from 'next/router';

import 'moment/locale/pt-br';

interface TaskContentProps {
  task: ITask;
}

const TaskContent: React.FC<TaskContentProps> = ({ task }) => {
  const { data: tasksDone } = useFetch<ITaskDone[]>('/tasks-done');
  const doneTask = tasksDone?.find((taskDone) => taskDone.newTask?._id === task?._id);
  const { addNewTask, removeTask } = useTaskList();

  const { mutate } = useSWRConfig();

  const router = useRouter();

  function handleTaskManagement() {
    if (task?.status === 'done') {
      removeTask(task?._id);
      return;
    }

    addNewTask(task?._id || '');

    mutate(`/tasks-done`);
  }

  function closeModal() {
    router.push('/dashboard');
  }

  return (
    <TaskContentContainer>
      <div className="modal-information">
        <TaskCompletedStatus completed={task?.status === 'done'}>
          {task?.status === 'done' ? 'Concluído' : 'Pendente'}
        </TaskCompletedStatus>

        {task?.status === 'done' && (
          <Moment className="modal-date" date={doneTask?.createdAt} fromNow />
        )}
      </div>

      <header className="modal-header">
        <h2 className="task-title">{task?.title}</h2>

        <button className="default-button task-finish" onClick={handleTaskManagement}>
          {task?.status === 'done' ? 'Reabrir tarefa' : 'Finalizar tarefa'}
        </button>

        <Close className="modal-close" onClick={closeModal} />
      </header>

      <p
        className="task-description"
        dangerouslySetInnerHTML={{ __html: task?.description }}
      />
    </TaskContentContainer>
  );
};

export default TaskContent;

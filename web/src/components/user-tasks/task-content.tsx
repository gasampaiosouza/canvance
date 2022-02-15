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
// import { useDropzone } from 'react-dropzone';

interface TaskContentProps {
  task: ITask;
}

const TaskContent: React.FC<TaskContentProps> = ({ task }) => {
  const { data: tasksDone } = useFetch<ITaskDone[]>('/tasks-done');
  const doneTask = tasksDone?.find((taskDone) => taskDone.newTask?._id === task?._id);
  const { addNewTask, removeTask } = useTaskList();

  const [observation, setObservation] = React.useState('');

  const { mutate } = useSWRConfig();
  const router = useRouter();

  // const onDrop = useCallback((acceptedFiles) => {
  //   function getBase64(file: File) {
  //     var reader = new FileReader();
  //     reader.readAsDataURL(file);

  //     reader.onerror = (error) => {
  //       console.log('Error: ', error);
  //     };

  //     return reader;
  //   }

  //   const [file] = acceptedFiles;
  //   const reader = getBase64(file);

  //   console.log(reader);
  // }, []);

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  function handleTaskManagement() {
    if (task?.status === 'done') return removeTask(task?._id);

    if (!observation) return alert('Explique como você finalizou a tarefa');

    addNewTask({ _id: task?._id, observation } || '');

    mutate(`/tasks-done`);
  }

  function closeModal() {
    router.push('/dashboard');
  }

  console.log(doneTask);

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

      <div className="observation-field">
        <textarea
          placeholder="Explique como você completou a tarefa"
          onChange={(ev) => setObservation(ev.target.value)}
          value={observation}
          defaultValue={doneTask?.observation}
        />
      </div>

      {/* <div
        {...getRootProps({ className: `file-dropzone ${isDragActive ? 'active' : ''}` })}
      >
        <input {...getInputProps()} />

        {isDragActive ? (
          <p>Arraste o arquivo aqui</p>
        ) : (
          <p>Arraste arquivos aqui, ou clique para selecionar</p>
        )}
      </div> */}
    </TaskContentContainer>
  );
};

export default TaskContent;

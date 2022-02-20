import { ITaskDone } from '@/interfaces';
import { useAuth } from 'hooks/useAuth';
import { groupBy } from 'lodash';
import Link from 'next/link';
import React from 'react';
import api from 'services/api';
import { AccountFinishedTasksContainer, CompletedIcon } from './styles';

const FinishedTasksContent = () => {
  const { user } = useAuth();
  const [finishedTasks, setFinishedTasks] = React.useState<ITaskDone[]>([]);

  const userFinishedTasks = finishedTasks.filter((task) => {
    return task.user._id == (user?._id || '');
  });

  const anotherUsersTasks = finishedTasks.filter((task) => task.user._id != user?._id);
  const groupedTasksByName = groupBy(anotherUsersTasks, 'user.name');

  React.useEffect(() => {
    async function getFinishedTasks() {
      const response = await api.get<ITaskDone[]>('/tasks-done');

      setFinishedTasks(response.data);
    }

    getFinishedTasks();
  }, []);

  return (
    <AccountFinishedTasksContainer>
      <h1>Tarefas finalizadas por mim</h1>

      {userFinishedTasks.length ? (
        <ul>
          {userFinishedTasks.map((task) => (
            <li key={task._id}>
              <Link href={`/dashboard/task?taskId=${task.newTask._id}`}>
                <a>
                  <CompletedIcon accountPage />

                  <strong>{task.newTask.title}</strong>
                  <p>{task.newTask.description}</p>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Você não finalizou nenhuma tarefa.</p>
      )}

      {user?.permissionLevel == 1 ? (
        <section className="admin-view">
          <h1>Tarefas finalizadas dos usuários</h1>
          <p>Apenas administradores podem ver isso</p>

          <div className="finished-tasks">
            {Object.entries(groupedTasksByName).map(([userName, tasks]) => (
              <div className="user-finished_tasks">
                <h2>{userName}</h2>

                <ul>
                  {tasks.map((task) => (
                    <li key={task._id}>
                      <CompletedIcon accountPage />

                      <strong>{task.newTask.title}</strong>
                      <p>{task.newTask.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </AccountFinishedTasksContainer>
  );
};

export default FinishedTasksContent;

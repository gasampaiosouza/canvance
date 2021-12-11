import React from 'react';
import Link from 'next/link';

import { ITask } from '@/interfaces';
import { sortTasksByRelevance } from 'helpers/sort-tasks-by-relevance';
import { toast } from 'react-toastify';
import { Box, BoxesContainer, Container, PageHeader } from './styles';

import api from 'services/api';

const ManageTasksContent = () => {
  const [tasks, setTasks] = React.useState<ITask[]>([]);

  React.useEffect(() => {
    // get tasks with async axios
    const getTasks = async () => {
      try {
        const response = await api.get<ITask[]>(`/tasks`);

        setTasks(response.data);
      } catch (error) {
        console.log(error);
        toast.error('Erro ao carregar as tarefas');
      }
    };

    getTasks();
  }, []);

  console.log(tasks);

  return (
    <Container>
      <PageHeader>
        <h2>Todas as Tarefas</h2>

        <Link href="/admin/tasks/new">
          <a className="new-task_button">Nova tarefa</a>
        </Link>
      </PageHeader>

      <BoxesContainer>
        {sortTasksByRelevance(tasks).map((task) => (
          <Link href={`/admin/tasks/edit/${task._id}`} key={task._id}>
            <Box>
              <span className="task-relevance">{task.relevance}</span>

              <h3 className="task-title">{task.title}</h3>
              <p className="task-description">{task.description}</p>

              <span className="task-category">{task.category.name}</span>
            </Box>
          </Link>
        ))}
      </BoxesContainer>
    </Container>
  );
};

export default ManageTasksContent;

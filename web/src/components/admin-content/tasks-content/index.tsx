import React from 'react';
import Link from 'next/link';

import { ITask } from '@/interfaces';
import { sortTasksByRelevance } from 'helpers/sort-tasks-by-relevance';
import { toast } from 'react-toastify';
import { Box, BoxesContainer, Container, PageHeader } from './styles';

import { DeleteOutline as DeleteIcon } from '@styled-icons/material-rounded';

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

  // console.log(tasks);

  const handleDeleteTask = async (taskId: string) => {
    try {
      await api.delete(`/tasks/${taskId}`);

      toast.success('Tarefa apagada com sucesso');

      setTasks((tasks) => tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.log(error);
      toast.error('Erro ao apagar a tarefa');
    }
  };

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

              <div className="task-bottom">
                <span className="task-category">{task.category.name}</span>
                <span
                  className="task-delete"
                  onClick={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();

                    const confirmTaskDeletion = window.confirm(
                      'Quer mesmo apagar a tarefa?'
                    );

                    if (!confirmTaskDeletion) return;

                    handleDeleteTask(task._id);
                  }}
                >
                  <DeleteIcon />
                </span>
              </div>
            </Box>
          </Link>
        ))}
      </BoxesContainer>
    </Container>
  );
};

export default ManageTasksContent;

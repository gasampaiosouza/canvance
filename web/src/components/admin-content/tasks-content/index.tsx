import React from 'react';
import Link from 'next/link';

import { ITask } from '@/interfaces';
import { sortTasksByRelevance } from 'helpers/sort-tasks-by-relevance';
import { toast } from 'react-toastify';
import { Container } from './styles';

import { DeleteOutline as DeleteIcon } from '@styled-icons/material-rounded';

import api from 'services/api';
import { useTaskList } from 'hooks/useTaskList';
import { Box, BoxesContainer, PageHeader } from '../styles';

const ManageTasksContent = () => {
  const { allTasks, mutateTasks } = useTaskList();

  const handleDeleteTask = async (taskId: string) => {
    try {
      await api.delete(`/tasks/${taskId}`);

      toast.success('Tarefa removida com sucesso');

      const currentTasks = allTasks.filter((task: ITask) => task._id !== taskId);

      mutateTasks(currentTasks);
    } catch (error) {
      console.log(error);
      toast.error('Erro ao remover a tarefa');
    }
  };

  return (
    <Container>
      <PageHeader>
        <h2>Todas as Tarefas</h2>

        <Link href="/admin/tasks/new">
          <a className="new-button">Nova tarefa</a>
        </Link>
      </PageHeader>

      <BoxesContainer>
        {sortTasksByRelevance(allTasks).map((task) => {
          const categoriesList = task?.category
            ?.map((category) => category.name)
            .join(', ');

          return (
            <Link href={`/admin/tasks/edit/${task?._id}`} key={task?._id}>
              <a>
                <Box>
                  <span className="task-relevance">{task?.relevance}</span>

                  <h3 className="task-title">{task?.title}</h3>
                  <p className="task-description">{task?.description}</p>

                  <div className="task-bottom">
                    <span className="task-category">{categoriesList}</span>
                    <span
                      className="task-delete"
                      onClick={(ev) => {
                        ev.preventDefault();
                        ev.stopPropagation();

                        const confirmTaskDeletion = window.confirm(
                          'Quer mesmo remover a tarefa?'
                        );

                        if (!confirmTaskDeletion) return;

                        handleDeleteTask(task?._id);
                      }}
                    >
                      <DeleteIcon />
                    </span>
                  </div>
                </Box>
              </a>
            </Link>
          );
        })}
      </BoxesContainer>
    </Container>
  );
};

export default ManageTasksContent;

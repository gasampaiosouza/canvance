import React from 'react';
import Link from 'next/link';

import { sortTasksByRelevance } from 'helpers/sort-tasks-by-relevance';
import { toast } from 'react-toastify';
import { Box, BoxesContainer, Container, PageHeader } from './styles';

import { DeleteOutline as DeleteIcon } from '@styled-icons/material-rounded';

import api from 'services/api';
import { IUser } from '@/interfaces';
import { useFetch } from 'hooks/useFetch';
import { ErrorMessage } from 'components/error-message';

const ManageUsersContent = () => {
  const { data: users, error } = useFetch<IUser[]>('/users');

  const handleDeleteTask = async (userId: string) => {
    try {
      await api.delete(`/user/${userId}`);

      toast.success('Usuário removido com sucesso');
    } catch (error) {
      console.log(error);
      toast.error('Erro ao remover o usuário');
    }
  };

  if (error) {
    return <ErrorMessage message="Erro ao carregar lista de usuários" />;
  }

  return (
    <Container>
      <PageHeader>
        <h2>Todos os usuários</h2>

        <Link href="/admin/users/new">
          <a className="new-task_button">Nova tarefa</a>
        </Link>
      </PageHeader>

      <BoxesContainer>
        {users?.map((user) => (
          <Link href={`/admin/users/edit/${user?._id}`} key={user?._id}>
            <Box>
              <span className="task-permission">{user?.permissionLevel}</span>

              <h3 className="user-name">{user?.name}</h3>
              <p className="user-email">{user?.email}</p>

              <div className="user-bottom">
                <span className="user-category">{user?.category?.name}</span>
                <span
                  className="user-delete"
                  onClick={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();

                    const confirmUserDeletion = window.confirm(
                      'Quer mesmo remover esse usuário?'
                    );

                    if (!confirmUserDeletion) return;

                    handleDeleteTask(user?._id);
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

export default ManageUsersContent;

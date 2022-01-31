import React from 'react';
import Link from 'next/link';

import { toast } from 'react-toastify';
import { Container } from './styles';

import { DeleteOutline as DeleteIcon } from '@styled-icons/material-rounded';

import api from 'services/api';
import { Box, BoxesContainer, PageHeader } from '../styles';
import { useUserList } from 'hooks/useUserList';

const ManageUsersContent = () => {
  const { allUsers, mutateUsers } = useUserList();

  const sortedUsersByPermission = allUsers?.sort((a, b) =>
    a.permissionLevel > b.permissionLevel ? 1 : -1
  );

  const permissions = {
    '1': 'Administrador',
    '2': 'Usuário comum',
    '3': 'Usuário comum 2',
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await api.delete(`/user/${userId}`);

      const filteredUsers = allUsers.filter((user) => user._id !== userId);
      mutateUsers(filteredUsers);

      toast.success('Usuário removido com sucesso');
    } catch (error) {
      console.log(error);
      toast.error('Erro ao remover o usuário');
    }
  };

  return (
    <Container>
      <PageHeader>
        <h2>Todos os usuários</h2>

        <Link href="/admin/users/new">
          <a className="new-button">Novo usuário</a>
        </Link>
      </PageHeader>

      <BoxesContainer>
        {sortedUsersByPermission?.map((user) => (
          <Link href={`/admin/users/edit/${user?._id}`} key={user?._id}>
            <Box active={user.active}>
              <span className="user-permission">
                {permissions[user?.permissionLevel]}
              </span>

              {!user.active ? (
                <span className="user-inactive">Usuário inativo</span>
              ) : null}

              <h3 className="user-name">{user?.name}</h3>
              <p className="user-email">{user?.email}</p>

              <div className="user-bottom">
                <span className="user-category">
                  {user?.category?.map((cat) => cat.name).join(' | ')}
                </span>
                <span
                  className="user-delete"
                  onClick={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();

                    const confirmUserDeletion = window.confirm(
                      'Quer mesmo remover esse usuário?'
                    );

                    if (!confirmUserDeletion) return;

                    handleDeleteUser(user?._id);
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

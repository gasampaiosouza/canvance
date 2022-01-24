import React from 'react';
import Link from 'next/link';

import { toast } from 'react-toastify';
import { Container } from './styles';

import { DeleteOutline as DeleteIcon } from '@styled-icons/material-rounded';

import api from 'services/api';
import { Box, BoxesContainer, PageHeader } from '../styles';
import { useCategoryList } from 'hooks/useCategoryList';
import { ITask, IUser } from '@/interfaces';

const ManageCategoriesContent = () => {
  const { allCategories, mutateCategories } = useCategoryList();

  const priorities = { high: 'alta', medium: 'média', low: 'baixa' };

  // sort categories by priority
  const sortedCategories = allCategories.sort((a, b) => {
    if (a.priority === b.priority) {
      return 0;
    }

    return a.priority > b.priority ? 1 : -1;
  });

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      // verify if tasks and users are associated with the category
      const responseTasks = await api.get<ITask[]>(`/tasks`);
      const responseUsers = await api.get<IUser[]>(`/users`);

      const associatedTasks = responseTasks.data.filter((task) =>
        task.category.some((category) => category._id === categoryId)
      );

      const associatedUsers = responseUsers.data.filter((user) =>
        user.category.some((category) => category._id === categoryId)
      );

      if (associatedTasks.length || associatedUsers.length) {
        const message = 'Essa categoria possui tarefas ou usuários associadas a ela.';

        toast.error(message);
        return;
      }

      await api.delete(`/category/${categoryId}`);

      const filteredCategories = allCategories.filter(
        (category) => category._id !== categoryId
      );

      mutateCategories(filteredCategories);

      toast.success('Categoria removida com sucesso');
    } catch (error) {
      console.log(error);
      toast.error('Erro ao remover a categoria');
    }
  };

  return (
    <Container>
      <PageHeader>
        <h2>Todas as categorias</h2>

        <Link href="/admin/categories/new">
          <a className="new-button">Nova categoria</a>
        </Link>
      </PageHeader>

      <BoxesContainer>
        {sortedCategories?.map((category) => (
          <Link href={`/admin/categories/edit/${category?._id}`} key={category?._id}>
            <Box>
              <span className="category-priority">
                Prioridade {priorities[category?.priority]}
              </span>

              <h3 className="category-name">{category?.name}</h3>
              <p className="category-description">{category?.description}</p>

              <div className="category-bottom">
                <span
                  className="category-delete"
                  onClick={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();

                    const confirmCategoryDeletion = window.confirm(
                      'Quer mesmo remover essa categoria?'
                    );

                    if (!confirmCategoryDeletion) return;

                    handleDeleteCategory(category?._id);
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

export default ManageCategoriesContent;

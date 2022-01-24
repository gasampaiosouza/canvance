import React from 'react';

import Link from 'next/link';
import api from 'services/api';
import router from 'next/router';

import { toast } from 'react-toastify';
import { Container, EditCategoryForm } from './styles';
import { PageBottom } from '../styles';

import { pick } from 'lodash';
import { useCategoryList } from 'hooks/useCategoryList';
import handleFormValidation from './components/handleFormValidation';
import CategoryFormContent from './components/form-content';

interface IProps {
  category_id: string;
}

const ManageEditCategory: React.FC<IProps> = ({ category_id }) => {
  const { allCategories, mutateCategories } = useCategoryList();
  const selectedCategory = allCategories.find((user) => user._id === category_id);

  const [formData, setFormData] = React.useState({} as CategoryFormProps);

  React.useEffect(() => {
    if (!selectedCategory) return;

    const formDataPick = pick(selectedCategory, ['name', 'description', 'priority']);

    setFormData(formDataPick);
  }, [selectedCategory]);

  const saveCategory = async (data: CategoryFormProps) => {
    try {
      const response = await api.put(`/category/${category_id}`, data);

      toast.success('Categoria atualizada com sucesso!');

      return response.data;
    } catch (err) {
      toast.error('Ocorreu um erro ao tentar atualizar a categoria.');
    }
  };

  const handleSaveCategory = async () => {
    const { isValid, formErrors } = handleFormValidation(formData);

    if (!isValid) {
      Object.values(formErrors).map((message) => toast.error(message));
      return;
    }

    const updatedCategory = await saveCategory(formData);

    router.push('/admin/categories').then(() => {
      const filteredCategories = allCategories.filter((user) => user._id !== category_id);

      mutateCategories([...filteredCategories, updatedCategory], false);
    });
  };

  return (
    <Container>
      <EditCategoryForm>
        <CategoryFormContent formData={formData} setFormData={setFormData} />
      </EditCategoryForm>

      <PageBottom>
        <button className="create-entity" onClick={handleSaveCategory}>
          Salvar
        </button>

        <Link href="/admin/users">
          <a className="create-entity_cancel">Cancelar</a>
        </Link>
      </PageBottom>
    </Container>
  );
};

export default ManageEditCategory;

import React from 'react';

import Link from 'next/link';
import api from 'services/api';
import router from 'next/router';

import { toast } from 'react-toastify';
import { Container, NewCategoryForm } from './styles';
import { PageBottom } from '../styles';

import { useCategoryList } from 'hooks/useCategoryList';
import handleFormValidation from './components/handleFormValidation';
import CategoryFormContent from './components/form-content';

interface FormProps {
  name: string;
  description: string;
  priority: string;
}

const ManageNewCategory = () => {
  const { allCategories, mutateCategories } = useCategoryList();

  const [formData, setFormData] = React.useState({} as FormProps);

  const resetForm = () => {
    setFormData({ name: '', description: '', priority: '' });
  };

  const validateBeforeSaving = (callback: Function) => {
    const { isValid, formErrors } = handleFormValidation(formData);

    if (!isValid) {
      Object.values(formErrors).map((message) => toast.error(message));
      return;
    }

    callback(formData);
  };

  const saveCategory = async (data: FormProps) => {
    try {
      const response = await api.post('/category', data);

      toast.success('Categoria criada com sucesso!');

      return response.data;
    } catch (err) {
      toast.error('Ocorreu um erro ao tentar criar a categoria.');
    }
  };

  const handleSaveCategory = async () => {
    const newCategory = await saveCategory(formData);

    router.push('/admin/categories').then(() => {
      mutateCategories([...allCategories, newCategory], true);
    });
  };

  const handleSaveCategoryAndNew = () => {
    saveCategory(formData);
    resetForm();
  };

  return (
    <Container>
      <NewCategoryForm>
        <CategoryFormContent formData={formData} setFormData={setFormData} />
      </NewCategoryForm>

      <PageBottom>
        <button
          className="create-entity"
          onClick={() => validateBeforeSaving(handleSaveCategory)}
        >
          Salvar
        </button>

        <div>
          <button
            className="create-entity_new"
            onClick={() => validateBeforeSaving(handleSaveCategoryAndNew)}
          >
            Salvar e novo
          </button>

          <Link href="/admin/categories">
            <a className="create-entity_cancel">Cancelar</a>
          </Link>
        </div>
      </PageBottom>
    </Container>
  );
};

export default ManageNewCategory;

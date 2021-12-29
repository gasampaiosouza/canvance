import React from 'react';
import Select from 'react-select';

import Link from 'next/link';
import api from 'services/api';
import router from 'next/router';

import { toast } from 'react-toastify';
import { Container, NewCategoryForm } from './styles';
import { Input, InputContainer, PageBottom, Textarea } from '../styles';

import { useTheme } from 'styled-components';
import { lighten } from 'polished';
import { ErrorMessage } from 'components/error-message';
import { useCategoryList } from 'hooks/useCategoryList';

interface FormProps {
  name: string;
  description: string;
  priority: string;
}

const ManageNewCategory = () => {
  const { allCategories, mutateCategories } = useCategoryList();

  const defaultTheme = useTheme();

  const [formErrors, setFormErrors] = React.useState({} as FormProps);
  const [formData, setFormData] = React.useState({} as FormProps);

  const saveCategory = async (data: FormProps) => {
    try {
      const response = await api.post('/category', data);

      toast.success('Categoria criada com sucesso!');

      return response.data;
    } catch (err) {
      toast.error('Ocorreu um erro ao tentar criar a categoria.');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', priority: '' });
  };

  const isFormValid = () => {
    const { name, description, priority } = formData;

    let isValid = true;

    // reset form errors
    setFormErrors({ name: '', description: '', priority: '' });

    if (!name?.length) {
      const message = 'O título é obrigatório';
      setFormErrors((prev) => ({ ...prev, title: message }));

      isValid = false;
    }

    if (!description?.length) {
      const message = 'A descrição é obrigatória';
      setFormErrors((prev) => ({ ...prev, description: message }));

      isValid = false;
    }

    if (!priority?.length) {
      const message = 'A categoria é obrigatória';
      setFormErrors((prev) => ({ ...prev, category: message }));

      isValid = false;
    }

    return isValid;
  };

  const handleSaveCategory = async () => {
    const isValid = isFormValid();

    if (!isValid) return;

    const newCategory = await saveCategory(formData);

    router.push('/admin/categories').then(() => {
      mutateCategories([...allCategories, newCategory], true);
    });
  };

  const handleSaveCategoryAndNew = () => {
    const isValid = isFormValid();

    if (!isValid) return;

    saveCategory(formData);

    resetForm();
  };

  const priorityOptions = [
    { value: 'high', label: 'Prioridade alta' },
    { value: 'medium', label: 'Prioridade média' },
    { value: 'low', label: 'Prioridade baixa' },
  ];

  const selectValue = priorityOptions.find(
    (priority) => priority.value === formData.priority
  );

  return (
    <Container>
      <NewCategoryForm>
        <InputContainer label="Nome da categoria">
          <Input
            // placeholder="Nome"
            value={formData.name}
            onChange={(ev) => setFormData((prev) => ({ ...prev, name: ev.target.value }))}
          />

          {formErrors?.name && <ErrorMessage message={formErrors.name || ''} />}
        </InputContainer>

        <InputContainer label="Prioridade da categoria">
          <Select
            value={selectValue || null}
            placeholder=""
            className="category-select"
            classNamePrefix="category-select"
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, priority: val?.value || '' }))
            }
            options={priorityOptions}
            theme={(theme) => ({
              ...theme,
              borderRadius: 8,
              colors: {
                ...theme.colors,
                text: defaultTheme.colors.text,
                primary25: lighten(0.325, defaultTheme.colors.primary),
                primary: defaultTheme.colors.primary,
              },
            })}
          />

          {formErrors?.priority && <ErrorMessage message={formErrors.priority || ''} />}
        </InputContainer>

        <InputContainer
          label="Descrição da categoria"
          style={{ gridColumn: '1 / span 3' }}
        >
          <Textarea
            value={formData.description}
            onChange={(ev) =>
              setFormData((prev) => ({ ...prev, description: ev.target.value }))
            }
          />

          {formErrors?.description && (
            <ErrorMessage message={formErrors.description || ''} />
          )}
        </InputContainer>
      </NewCategoryForm>

      <PageBottom>
        <button className="create-entity" onClick={handleSaveCategory}>
          Salvar
        </button>

        <button className="create-entity_new" onClick={handleSaveCategoryAndNew}>
          Salvar e novo
        </button>

        <Link href="/admin/categories">
          <a className="create-entity_cancel">Cancelar</a>
        </Link>
      </PageBottom>
    </Container>
  );
};

export default ManageNewCategory;

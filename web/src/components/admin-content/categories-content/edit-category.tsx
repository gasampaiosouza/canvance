import React from 'react';
import Select from 'react-select';

import Link from 'next/link';
import api from 'services/api';
import router from 'next/router';

import { toast } from 'react-toastify';
import { Container, EditCategoryForm } from './styles';
import { Input, InputContainer, PageBottom, Textarea } from '../styles';

import { useTheme } from 'styled-components';
import { ErrorMessage } from 'components/error-message';
import { pick } from 'lodash';
import { useCategoryList } from 'hooks/useCategoryList';

interface IProps {
  category_id: string;
}

interface FormProps {
  name: string;
  description: string;
  priority: string;
}

const ManageEditCategory: React.FC<IProps> = ({ category_id }) => {
  const { allCategories, mutateCategories } = useCategoryList();
  const selectedCategory = allCategories.find((user) => user._id === category_id);

  const defaultTheme = useTheme();

  const [formErrors, setFormErrors] = React.useState({} as FormProps);
  const [formData, setFormData] = React.useState({} as FormProps);

  React.useEffect(() => {
    if (!selectedCategory) return;

    const formDataPick = pick(selectedCategory, ['name', 'description', 'priority']);

    setFormData({ ...formDataPick });
  }, [selectedCategory]);

  const saveCategory = async (data: FormProps) => {
    try {
      const response = await api.put(`/category/${category_id}`, data);

      toast.success('Categoria atualizada com sucesso!');

      return response.data;
    } catch (err) {
      toast.error('Ocorreu um erro ao tentar atualizar a categoria.');
    }
  };

  const isFormValid = () => {
    const { name, description, priority } = formData;

    let isValid = true;

    // reset form errors
    setFormErrors({ name: '', description: '', priority: '' });

    if (!name) {
      const message = 'O nome é obrigatório';
      setFormErrors((prev) => ({ ...prev, title: message }));

      isValid = false;
    }

    if (!description) {
      const message = 'O email é obrigatório';
      setFormErrors((prev) => ({ ...prev, description: message }));

      isValid = false;
    }

    if (!priority) {
      const message = 'A categoria é obrigatória';
      setFormErrors((prev) => ({ ...prev, priority: message }));

      isValid = false;
    }

    return isValid;
  };

  const handleSaveCategory = async () => {
    const isValid = isFormValid();

    if (!isValid) return;

    const updatedCategory = await saveCategory(formData);

    router.push('/admin/categories').then(() => {
      const filteredCategories = allCategories.filter((user) => user._id !== category_id);

      mutateCategories([...filteredCategories, updatedCategory], false);
    });
  };

  const priorityOptions = [
    { value: 'high', label: 'Prioridade alta' },
    { value: 'medium', label: 'Prioridade média' },
    { value: 'low', label: 'Prioridade baixa' },
  ];

  const selectValue = priorityOptions.find(
    (priority) => priority.value === selectedCategory?.priority
  );

  return (
    <Container>
      <EditCategoryForm>
        <InputContainer label="Nome da categoria">
          <Input
            defaultValue={selectedCategory?.name || ''}
            onBlur={(ev) => setFormData((prev) => ({ ...prev, name: ev.target.value }))}
          />

          {formErrors?.name && <ErrorMessage message={formErrors.name || ''} />}
        </InputContainer>

        <InputContainer label="Prioridade da categoria">
          <Select
            defaultValue={selectValue}
            placeholder=""
            className="category-select"
            classNamePrefix="category-select"
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, priority: val?.value || '' }))
            }
            options={priorityOptions}
            theme={defaultTheme.select_default}
          />

          {formErrors?.priority && <ErrorMessage message={formErrors.priority || ''} />}
        </InputContainer>

        <InputContainer
          label="Descrição da categoria"
          style={{ gridColumn: '1 / span 3' }}
        >
          <Textarea
            defaultValue={selectedCategory?.description || ''}
            onChange={(ev) =>
              setFormData((prev) => ({ ...prev, description: ev.target.value }))
            }
          />

          {formErrors?.description && (
            <ErrorMessage message={formErrors.description || ''} />
          )}
        </InputContainer>
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

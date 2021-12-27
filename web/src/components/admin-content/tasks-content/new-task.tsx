import React from 'react';
import Select from 'react-select';

import Link from 'next/link';
import api from 'services/api';
import router from 'next/router';

import { ICategory } from '@/interfaces';
import { toast } from 'react-toastify';
import {
  Container,
  Input,
  InputContainer,
  NewTaskForm,
  PageBottom,
  Textarea,
} from './styles';

import { useTheme } from 'styled-components';
import { lighten } from 'polished';
import { ErrorMessage } from 'components/error-message';

interface FormProps {
  title: string;
  description: string;
  relevance: string | number;
  category: string;
}

const ManageNewTask = () => {
  const defaultTheme = useTheme();

  const [categories, setCategories] = React.useState<ICategory[]>([]);

  const [formErrors, setFormErrors] = React.useState({} as FormProps);
  const [formData, setFormData] = React.useState({} as FormProps);

  React.useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await api.get('/category');

        setCategories(response.data);
      } catch (error) {
        console.log(error);
        toast.error('Ocorreu um erro ao tentar carregar as categorias.');
      }
    };

    getCategories();
  }, []);

  const saveTask = async (data: FormProps) => {
    try {
      await api.post('/tasks', data);

      toast.success('Tarefa criada com sucesso!');
    } catch (err) {
      toast.error('Ocorreu um erro ao tentar criar a tarefa.');
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', relevance: '', category: '' });
  };

  const isFormValid = () => {
    const { title, description, relevance, category } = formData;

    let isValid = true;

    // reset form errors
    setFormErrors({ title: '', description: '', relevance: '', category: '' });

    if (!title?.length) {
      const message = 'O título é obrigatório';
      setFormErrors((prev) => ({ ...prev, title: message }));

      isValid = false;
    }

    if (!description?.length) {
      const message = 'A descrição é obrigatória';
      setFormErrors((prev) => ({ ...prev, description: message }));

      isValid = false;
    }

    if (!category?.length) {
      const message = 'A categoria é obrigatória';
      setFormErrors((prev) => ({ ...prev, category: message }));

      isValid = false;
    }

    if (!relevance || relevance < 1 || relevance > 100) {
      const message = 'A relevância deve estar entre 1 e 100';
      setFormErrors((prev) => ({ ...prev, relevance: message }));

      isValid = false;
    }

    return isValid;
  };

  const handleSaveTask = async () => {
    const isValid = isFormValid();

    if (!isValid) return;

    await saveTask(formData);

    router.push('/admin/tasks');
  };

  const handleSaveTaskAndNew = () => {
    const isValid = isFormValid();

    if (!isValid) return;

    saveTask(formData);

    resetForm();
  };

  const categoriesOptions = categories.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  const selectValue = categories.find((category) => category._id === formData.category);

  return (
    <Container>
      <NewTaskForm>
        <InputContainer>
          <Input
            placeholder="Título da tarefa"
            value={formData.title}
            onChange={(ev) =>
              setFormData((prev) => ({ ...prev, title: ev.target.value }))
            }
            // {...register('title', {
            //   required: 'O título é obrigatório',
            // })}
          />

          {formErrors?.title && <ErrorMessage message={formErrors.title || ''} />}
        </InputContainer>

        <InputContainer>
          <Select
            value={
              selectValue ? { value: selectValue?._id, label: selectValue?.name } : null
            }
            // onChange={(val) => onChange(val?.value)}
            placeholder="Categoria"
            className="category-select"
            classNamePrefix="category-select"
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, category: val?.value || '' }))
            }
            options={categoriesOptions}
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

          {formErrors?.category && <ErrorMessage message={formErrors.category || ''} />}
        </InputContainer>

        <InputContainer>
          <Input
            value={formData.relevance}
            type="number"
            placeholder="Relevância"
            onChange={(ev) =>
              setFormData((prev) => ({ ...prev, relevance: Number(ev.target.value) }))
            }
            // {...register('relevance', {
            //   required: 'A relevância é obrigatória',
            //   min: { value: 0, message: 'O valor deve ser entre 0 e 100.' },
            //   max: { value: 100, message: 'O valor deve ser entre 0 e 100.' },
            // })}
          />

          {formErrors?.relevance && <ErrorMessage message={formErrors.relevance || ''} />}
        </InputContainer>

        <InputContainer style={{ gridColumn: '1 / span 3' }}>
          <Textarea
            value={formData.description}
            placeholder="Descrição da tarefa"
            onChange={(ev) =>
              setFormData((prev) => ({ ...prev, description: ev.target.value }))
            }
            // {...register('description', {
            //   required: 'A descrição é obrigatória',
            // })}
          />

          {formErrors?.description && (
            <ErrorMessage message={formErrors.description || ''} />
          )}
        </InputContainer>
      </NewTaskForm>

      <PageBottom>
        <button className="create-task" onClick={handleSaveTask}>
          Salvar
        </button>

        <button className="create-task_new" onClick={handleSaveTaskAndNew}>
          Salvar e novo
        </button>

        <Link href="/admin/tasks">
          <a className="create-task_cancel">Cancelar</a>
        </Link>
      </PageBottom>
    </Container>
  );
};

export default ManageNewTask;

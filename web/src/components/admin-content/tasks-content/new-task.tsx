import React from 'react';
import Select from 'react-select';

import { Controller, useForm } from 'react-hook-form';

import { ICategory, ITask } from '@/interfaces';
import { toast } from 'react-toastify';
import {
  Container,
  Input,
  InputContainer,
  NewTaskForm,
  PageBottom,
  Textarea,
} from './styles';

import api from 'services/api';
import { useTheme } from 'styled-components';
import { lighten } from 'polished';
import router from 'next/router';
import { ErrorMessage } from 'components/error-message';
import { handleClassValidation } from 'helpers/handle-form_class';

interface FormProps {
  title: string;
  description: string;
  relevance: number;
  category: string;
}

const ManageNewTask = () => {
  const defaultTheme = useTheme();

  const [trigger, setTrigger] = React.useState({
    save: false,
    saveAndNew: false,
    cancel: false,
  });

  const [categories, setCategories] = React.useState<ICategory[]>([]);
  const { register, formState, handleSubmit, reset, control } = useForm<FormProps>();

  const { errors, dirtyFields } = formState;

  const saveTask = async (data: ITask) => {
    try {
      await api.post('/tasks', data);

      toast.success('Tarefa criada com sucesso!');
    } catch (err) {
      toast.error('Ocorreu um erro ao tentar criar a tarefa.');
    }
  };

  const onSubmit = (data: ITask) => {
    // do something in every case

    if (trigger.save) return handleSaveTask(data);
    if (trigger.saveAndNew) return handleSaveTaskAndNew(data);

    if (trigger.cancel) return handleCancel();
  };

  const handleSaveTask = (data: ITask) => {
    saveTask(data);

    router.push('/admin/tasks');
  };

  const handleSaveTaskAndNew = (data: ITask) => {
    saveTask(data);
    reset();
  };

  const handleCancel = () => router.push('/admin/tasks');

  const categoriesOptions = categories.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  React.useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await api.get('/category');

        setCategories(response.data);
      } catch (error) {
        toast.error('Ocorreu um erro ao tentar carregar as categorias.');
      }
    };

    getCategories();
  }, []);

  return (
    <Container>
      <NewTaskForm onSubmit={handleSubmit(onSubmit)}>
        <InputContainer className={handleClassValidation(errors?.title, dirtyFields)}>
          <Input
            placeholder="Título da tarefa"
            {...register('title', {
              required: 'O título é obrigatório',
            })}
          />

          {errors?.title && <ErrorMessage message={errors.title.message || ''} />}
        </InputContainer>

        <InputContainer className={handleClassValidation(errors?.category, dirtyFields)}>
          <Controller
            // @ts-ignore
            control={control}
            name="category"
            rules={{
              required: 'A categoria é obrigatória',
            }}
            render={({ field: { onChange, value, ref } }) => (
              <Select
                // @ts-ignore
                inputRef={ref}
                onChange={(val) => onChange(val?.value)}
                value={categoriesOptions.find((c) => c?.value === value)}
                placeholder="Categoria"
                className="category-select"
                classNamePrefix="category-select"
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
            )}
          />

          {errors?.category && <ErrorMessage message={errors.category.message || ''} />}
        </InputContainer>

        <InputContainer className={handleClassValidation(errors?.relevance, dirtyFields)}>
          <Input
            type="number"
            placeholder="Relevância"
            {...register('relevance', {
              required: 'A relevância é obrigatória',
              min: { value: 0, message: 'O valor deve ser entre 0 e 100.' },
              max: { value: 100, message: 'O valor deve ser entre 0 e 100.' },
            })}
          />

          {errors?.relevance && <ErrorMessage message={errors.relevance.message || ''} />}
        </InputContainer>

        <InputContainer
          style={{ gridColumn: '1 / span 3' }}
          className={handleClassValidation(errors?.description, dirtyFields)}
        >
          <Textarea
            placeholder="Descrição da tarefa"
            {...register('description', {
              required: 'A descrição é obrigatória',
            })}
          />

          {errors?.description && (
            <ErrorMessage message={errors.description.message || ''} />
          )}
        </InputContainer>

        <PageBottom>
          <button
            className="create-task"
            onClick={() => setTrigger({ saveAndNew: false, cancel: false, save: true })}
          >
            Salvar
          </button>

          <button
            className="create-task_new"
            onClick={() => setTrigger({ saveAndNew: true, cancel: false, save: false })}
          >
            Salvar e novo
          </button>

          <button
            className="create-task_cancel"
            onClick={() => setTrigger({ saveAndNew: false, cancel: true, save: false })}
          >
            Cancelar
          </button>
        </PageBottom>
      </NewTaskForm>
    </Container>
  );
};

export default ManageNewTask;

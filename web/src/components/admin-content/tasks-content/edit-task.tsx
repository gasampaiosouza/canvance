import { ICategory, ITask } from '@/interfaces';
import { ErrorMessage } from 'components/error-message';
import { handleClassValidation } from 'helpers/handle-form_class';
import router from 'next/router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import api from 'services/api';
import { useTheme } from 'styled-components';
import {
  Container,
  Input,
  InputContainer,
  EditTaskForm,
  PageBottom,
  Textarea,
} from './styles';

import Select from 'react-select';
import { lighten } from 'polished';

interface IProps {
  taskId: string;
}

interface FormProps {
  title: string;
  description: string;
  relevance: number;
  category: string;
}

const ManageEditTask: React.FC<IProps> = ({ taskId }) => {
  const defaultTheme = useTheme();

  const [task, setTask] = React.useState<ITask>();
  const [categories, setCategories] = React.useState<ICategory[]>([]);
  const { register, formState, handleSubmit, reset, control } = useForm<FormProps>();
  const [trigger, setTrigger] = React.useState({
    save: false,
    cancel: false,
  });

  const { errors, dirtyFields } = formState;

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

    const getTask = async () => {
      try {
        const response = await api.get(`/tasks/${taskId}`);

        setTask(response.data);
      } catch (error) {
        toast.error('Ocorreu um erro ao carregar a tarefa');

        router.push('/admin/tasks');
      }
    };

    getTask();
    getCategories();
  }, [taskId]);

  const handleCancel = () => router.push('/admin/tasks');

  const handleSaveTask = async (data: ITask) => {
    try {
      await api.post('/tasks', data);

      toast.success('Tarefa criada com sucesso!');
      router.push('/admin/tasks');
    } catch (err) {
      toast.error('Ocorreu um erro ao tentar criar a tarefa.');
    }
  };

  const onSubmit = (data: ITask) => {
    // do something in every case

    if (trigger.save) return handleSaveTask(data);

    if (trigger.cancel) return handleCancel();
  };

  console.log(task);

  return (
    <Container>
      <EditTaskForm onSubmit={handleSubmit(onSubmit)}>
        <InputContainer className={handleClassValidation(errors?.title, dirtyFields)}>
          <Input
            defaultValue={task?.title}
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
                value={categoriesOptions.filter(
                  (option) => option.label === task?.category.name
                )}
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
            defaultValue={task?.relevance}
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
            defaultValue={task?.description}
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
            onClick={() => setTrigger({ cancel: false, save: true })}
          >
            Salvar
          </button>

          <button
            className="create-task_cancel"
            onClick={() => setTrigger({ cancel: true, save: false })}
          >
            Cancelar
          </button>
        </PageBottom>
      </EditTaskForm>
    </Container>
  );
};

export default ManageEditTask;

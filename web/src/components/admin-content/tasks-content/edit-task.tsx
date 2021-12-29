import React from 'react';
import Select from 'react-select';

import Link from 'next/link';
import api from 'services/api';
import router from 'next/router';

import { toast } from 'react-toastify';
import { Container, EditTaskForm } from './styles';
import { Input, InputContainer, PageBottom, Textarea } from '../styles';

import { useTheme } from 'styled-components';
import { ErrorMessage } from 'components/error-message';
import { useTaskList } from 'hooks/useTaskList';
import { pick } from 'lodash';
import { useCategoryList } from 'hooks/useCategoryList';

interface IProps {
  taskId: string;
}

interface FormProps {
  title: string;
  description: string;
  relevance: string | number;
  category: string;
}

const ManageEditTask: React.FC<IProps> = ({ taskId }) => {
  const { allCategories } = useCategoryList();
  const { allTasks, mutateTasks } = useTaskList();
  const currentTask = allTasks.find((task) => task._id === taskId);

  const defaultTheme = useTheme();

  const [formErrors, setFormErrors] = React.useState({} as FormProps);
  const [formData, setFormData] = React.useState({} as FormProps);

  React.useEffect(() => {
    if (!currentTask) return;

    const formDataPick = pick(currentTask, ['title', 'description', 'relevance']);

    setFormData({ ...formDataPick, category: currentTask?.category?._id });
  }, [currentTask]);

  const saveTask = async (data: FormProps) => {
    try {
      const response = await api.put(`/tasks/${taskId}`, data);

      toast.success('Tarefa atualizada com sucesso!');

      return response.data;
    } catch (err) {
      toast.error('Ocorreu um erro ao tentar atualizar a tarefa.');
    }
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

    if (!category.length) {
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

    const updatedTask = await saveTask(formData);

    router.push('/admin/tasks').then(() => {
      const filteredTasks = allTasks.filter((task) => task._id !== taskId);

      mutateTasks([...filteredTasks, updatedTask], false);
    });
  };

  const categoriesOptions = allCategories.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  const selectValue = allCategories.find(
    (category) => category._id === formData?.category
  );

  return (
    <Container>
      <EditTaskForm>
        <InputContainer label="Título da tarefa">
          <Input
            // placeholder="Título da tarefa"
            defaultValue={currentTask?.title || ''}
            onBlur={(ev) => setFormData((prev) => ({ ...prev, title: ev.target.value }))}
          />

          {formErrors?.title && <ErrorMessage message={formErrors.title || ''} />}
        </InputContainer>

        <InputContainer label="Categoria da tarefa">
          <Select
            value={
              selectValue ? { value: selectValue?._id, label: selectValue?.name } : null
            }
            placeholder=""
            className="category-select"
            classNamePrefix="category-select"
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, category: val?.value || '' }))
            }
            options={categoriesOptions}
            theme={defaultTheme.select_default}
          />

          {formErrors?.category && <ErrorMessage message={formErrors.category || ''} />}
        </InputContainer>

        <InputContainer label="Relevância">
          <Input
            defaultValue={currentTask?.relevance || ''}
            type="number"
            // placeholder="Relevância"
            onBlur={(ev) =>
              setFormData((prev) => ({ ...prev, relevance: Number(ev.target.value) }))
            }
          />

          {formErrors?.relevance && <ErrorMessage message={formErrors.relevance || ''} />}
        </InputContainer>

        <InputContainer style={{ gridColumn: '1 / span 3' }} label="Descrição da tarefa">
          <Textarea
            defaultValue={currentTask?.description || ''}
            // placeholder="Descrição da tarefa"
            onBlur={(ev) =>
              setFormData((prev) => ({ ...prev, description: ev.target.value }))
            }
          />

          {formErrors?.description && (
            <ErrorMessage message={formErrors.description || ''} />
          )}
        </InputContainer>
      </EditTaskForm>

      <PageBottom>
        <button className="create-task" onClick={handleSaveTask}>
          Salvar
        </button>

        <Link href="/admin/tasks">
          <a className="create-task_cancel">Cancelar</a>
        </Link>
      </PageBottom>
    </Container>
  );
};

export default ManageEditTask;

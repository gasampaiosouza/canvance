import React from 'react';

import Link from 'next/link';
import api from 'services/api';
import router from 'next/router';

import { toast } from 'react-toastify';
import { Container, EditTaskForm } from './styles';
import { PageBottom } from '../styles';

import { useTaskList } from 'hooks/useTaskList';
import { pick } from 'lodash';
import TaskFormContent from './components/form-content';
import handleFormValidation from './components/handleFormValidation';
import { useSWRConfig } from 'swr';

interface IProps {
  taskId: string;
}

const ManageEditTask: React.FC<IProps> = ({ taskId }) => {
  const { allTasks, mutateTasks } = useTaskList();
  const currentTask = allTasks.find((task) => task._id === taskId);

  const [formData, setFormData] = React.useState({} as TaskFormProps);

  React.useEffect(() => {
    if (!currentTask) return;

    const formDataPick = pick(currentTask, ['title', 'description', 'relevance']);

    const userCategories = currentTask.category.map((category) => category._id).join(',');

    setFormData({ ...formDataPick, category: userCategories });
  }, [currentTask]);

  const saveTask = async (data: TaskFormProps) => {
    try {
      const response = await api.put(`/tasks/${taskId}`, data);

      toast.success('Tarefa atualizada com sucesso!');

      return response.data;
    } catch (err) {
      toast.error('Ocorreu um erro ao tentar atualizar a tarefa.');
    }
  };

  const handleSaveTask = async () => {
    const { isValid, formErrors } = handleFormValidation(formData);

    if (!isValid) {
      Object.values(formErrors).map((message) => toast.error(message));
      return;
    }

    const updatedTask = await saveTask(formData);

    router.push('/admin/tasks').then(() => {
      const filteredTasks = allTasks.filter((task) => task._id !== taskId);

      mutateTasks([...filteredTasks, updatedTask], false);
    });
  };

  return (
    <Container>
      <EditTaskForm>
        <TaskFormContent formData={formData} setFormData={setFormData} />
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

import React from 'react';

import Link from 'next/link';
import api from 'services/api';
import router from 'next/router';

import { toast } from 'react-toastify';
import { Container, NewTaskForm } from './styles';
import { PageBottom } from '../styles';

import { useTaskList } from 'hooks/useTaskList';
import TaskFormContent from './components/form-content';
import handleFormValidation from './components/handleFormValidation';

const ManageNewTask = () => {
  const { allTasks, mutateTasks } = useTaskList();
  const [formData, setFormData] = React.useState({} as TaskFormProps);

  const resetForm = () => {
    setFormData({ title: '', description: '', relevance: '', category: '' });
  };

  const validateBeforeSaving = (callback: Function) => {
    const { isValid, formErrors } = handleFormValidation(formData);

    if (!isValid) {
      Object.values(formErrors).map((message) => toast.error(message));
      return;
    }

    callback(formData);
  };

  const saveTask = async (data: TaskFormProps) => {
    try {
      const response = await api.post('/tasks', data);

      toast.success('Tarefa criada com sucesso!');

      return response.data;
    } catch (err) {
      toast.error('Ocorreu um erro ao tentar criar a tarefa.');
    }
  };

  const handleSaveTask = async () => {
    const newTask = await saveTask(formData);

    router.push('/admin/tasks').then(() => {
      mutateTasks([...allTasks, newTask], true);
    });
  };

  const handleSaveTaskAndNew = () => {
    saveTask(formData);

    resetForm();
  };

  return (
    <Container>
      <NewTaskForm>
        <TaskFormContent formData={formData} setFormData={setFormData} />
      </NewTaskForm>

      <PageBottom>
        <button
          className="create-task"
          onClick={() => validateBeforeSaving(handleSaveTask)}
        >
          Salvar
        </button>

        <button
          className="create-task_new"
          onClick={() => validateBeforeSaving(handleSaveTaskAndNew)}
        >
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

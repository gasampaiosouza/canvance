import React from 'react';

import Link from 'next/link';
import api from 'services/api';
import router from 'next/router';

import { toast } from 'react-toastify';
import { Container, NewUserForm } from './styles';
import { PageBottom } from '../styles';

import { useUserList } from 'hooks/useUserList';
import { PermissionDescription } from './components/permission-description';
import UserFormContent from './components/form-content';
import handleFormValidation from './components/handleFormValidation';

const ManageNewUser = () => {
  const { allUsers, mutateUsers } = useUserList();
  const [formData, setFormData] = React.useState({} as UserFormProps);

  const resetForm = () => {
    setFormData({ name: '', email: '', permissionLevel: '', category: '' });
  };

  const validateBeforeSaving = (callback: Function) => {
    const { isValid, formErrors } = handleFormValidation(formData);

    if (!isValid) {
      Object.values(formErrors).map((message) => toast.error(message));
      return;
    }

    callback(formData);
  };

  const saveUser = async (data: UserFormProps) => {
    try {
      const response = await api.post('/auth/register', {
        ...data,

        // default password
        password: '123456789',
      });

      toast.success('Usuário criado com sucesso!');

      return response.data;
    } catch (err) {
      toast.error('Ocorreu um erro ao tentar criar o usuário.');
    }
  };

  const handleSaveUser = async (userData: UserFormProps) => {
    const newUser = await saveUser(userData);

    router.push('/admin/users').then(() => {
      mutateUsers([...allUsers, newUser], true);
    });
  };

  const handleSaveUserAndNew = () => {
    saveUser(formData);

    resetForm();
  };

  return (
    <Container>
      <NewUserForm>
        <UserFormContent setFormData={setFormData} formData={formData} />
      </NewUserForm>

      <PermissionDescription />

      <PageBottom>
        <button
          className="create-entity"
          onClick={() => validateBeforeSaving(handleSaveUser)}
        >
          Salvar
        </button>

        <button
          className="create-entity_new"
          onClick={() => validateBeforeSaving(handleSaveUserAndNew)}
        >
          Salvar e novo
        </button>

        <Link href="/admin/users">
          <a className="create-entity_cancel">Cancelar</a>
        </Link>
      </PageBottom>
    </Container>
  );
};

export default ManageNewUser;

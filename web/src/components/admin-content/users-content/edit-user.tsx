import React from 'react';

import Link from 'next/link';
import api from 'services/api';
import router from 'next/router';

import { toast } from 'react-toastify';
import { Container, EditUserForm } from './styles';
import { PageBottom } from '../styles';

import { pick } from 'lodash';
import { useUserList } from 'hooks/useUserList';
import { PermissionDescription } from './components/permission-description';
import UserFormContent from './components/form-content';
import handleFormValidation from './components/handleFormValidation';

interface IProps {
  userId: string;
}

const ManageEditUser: React.FC<IProps> = ({ userId }) => {
  const { allUsers, mutateUsers } = useUserList();
  const selectedUser = allUsers.find((user) => user._id === userId);

  const [formData, setFormData] = React.useState({} as UserFormProps);

  React.useEffect(() => {
    if (!selectedUser) return;

    const formDataPick = pick(selectedUser, ['name', 'email', 'permissionLevel']);

    const userCategories = selectedUser.category
      .map((category) => category._id)
      .join(',');

    setFormData({ ...formDataPick, category: userCategories });
  }, [selectedUser]);

  const saveUser = async (data: UserFormProps) => {
    try {
      const response = await api.put(`/user/profile/${userId}`, data);

      toast.success('Usuário atualizado com sucesso!');

      return response.data;
    } catch (err) {
      toast.error('Ocorreu um erro ao tentar atualizar o usuário.');
    }
  };

  const handleSaveUser = async (userData: UserFormProps) => {
    const { isValid, formErrors } = handleFormValidation(userData);

    if (!isValid) {
      Object.values(formErrors).map((message) => toast.error(message));
      return;
    }

    const updatedUser = await saveUser(formData);

    router.push('/admin/users').then(() => {
      const filteredUsers = allUsers.filter((user) => user._id !== userId);

      mutateUsers([...filteredUsers, updatedUser], false);
    });
  };

  return (
    <Container>
      <EditUserForm>
        <UserFormContent setFormData={setFormData} formData={formData} />
      </EditUserForm>

      <PermissionDescription />

      <PageBottom>
        <button className="create-entity" onClick={() => handleSaveUser(formData)}>
          Salvar
        </button>

        <Link href="/admin/users">
          <a className="create-entity_cancel">Cancelar</a>
        </Link>
      </PageBottom>
    </Container>
  );
};

export default ManageEditUser;

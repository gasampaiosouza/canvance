import React from 'react';
import Select from 'react-select';

import Link from 'next/link';
import api from 'services/api';
import router from 'next/router';

import { toast } from 'react-toastify';
import { Container, EditUserForm } from './styles';
import { Input, InputContainer, PageBottom } from '../styles';

import { useTheme } from 'styled-components';
import { lighten } from 'polished';
import { ErrorMessage } from 'components/error-message';
import { pick } from 'lodash';
import { useUserList } from 'hooks/useUserList';
import { useCategoryList } from 'hooks/useCategoryList';
import { PermissionDescription } from './permission-description';

interface IProps {
  userId: string;
}

interface FormProps {
  name: string;
  email: string;
  category: string;
  permissionLevel: number | string;
}

const ManageEditUser: React.FC<IProps> = ({ userId }) => {
  const { allCategories } = useCategoryList();
  const { allUsers, mutateUsers } = useUserList();
  const selectedUser = allUsers.find((user) => user._id === userId);

  const defaultTheme = useTheme();

  const [formErrors, setFormErrors] = React.useState({} as FormProps);
  const [formData, setFormData] = React.useState({} as FormProps);

  React.useEffect(() => {
    if (!selectedUser) return;

    const formDataPick = pick(selectedUser, ['name', 'email', 'permissionLevel']);

    setFormData({ ...formDataPick, category: selectedUser.category._id });
  }, [selectedUser]);

  const saveUser = async (data: FormProps) => {
    try {
      const response = await api.put(`/user/profile/${userId}`, data);

      toast.success('Usuário atualizado com sucesso!');

      return response.data;
    } catch (err) {
      toast.error('Ocorreu um erro ao tentar atualizar o usuário.');
    }
  };

  const isFormValid = () => {
    const { name, email, permissionLevel, category } = formData;

    let isValid = true;

    // reset form errors
    setFormErrors({ name: '', email: '', permissionLevel: '', category: '' });

    if (!name) {
      const message = 'O nome é obrigatório';
      setFormErrors((prev) => ({ ...prev, title: message }));

      isValid = false;
    }

    if (!email) {
      const message = 'O email é obrigatório';
      setFormErrors((prev) => ({ ...prev, description: message }));

      isValid = false;
    }

    if (!category) {
      const message = 'A categoria é obrigatória';
      setFormErrors((prev) => ({ ...prev, category: message }));

      isValid = false;
    }

    if (!permissionLevel) {
      const message = 'O nível de permissão é obrigatório';
      setFormErrors((prev) => ({ ...prev, permissionLevel: message }));

      isValid = false;
    }

    if (permissionLevel < 1 || permissionLevel > 3) {
      const message = 'O nível de permissão deve estar entre 1 e 3';
      setFormErrors((prev) => ({ ...prev, permissionLevel: message }));

      isValid = false;
    }

    return isValid;
  };

  const handleSaveUser = async () => {
    const isValid = isFormValid();

    if (!isValid) return;

    const updatedUser = await saveUser(formData);

    router.push('/admin/users').then(() => {
      const filteredUsers = allUsers.filter((user) => user._id !== userId);

      mutateUsers([...filteredUsers, updatedUser], false);
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
      <EditUserForm>
        <InputContainer label="Nome do usuário">
          <Input
            placeholder="Nome do usuário"
            defaultValue={selectedUser?.name || ''}
            onBlur={(ev) => setFormData((prev) => ({ ...prev, name: ev.target.value }))}
          />

          {formErrors?.name && <ErrorMessage message={formErrors.name || ''} />}
        </InputContainer>

        <InputContainer label="Email do usuário">
          <Input
            placeholder="Email do usuário"
            defaultValue={selectedUser?.email || ''}
            onBlur={(ev) => setFormData((prev) => ({ ...prev, email: ev.target.value }))}
          />

          {formErrors?.email && <ErrorMessage message={formErrors.email || ''} />}
        </InputContainer>

        <InputContainer label="Categoria do usuário">
          <Select
            value={
              selectValue ? { value: selectValue?._id, label: selectValue?.name } : null
            }
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

        <InputContainer label="Nível de permissão">
          <Input
            defaultValue={selectedUser?.permissionLevel || ''}
            type="number"
            placeholder="Nível de permissão"
            onBlur={(ev) =>
              setFormData((prev) => ({
                ...prev,
                permissionLevel: Number(ev.target.value),
              }))
            }
          />

          {formErrors?.permissionLevel && (
            <ErrorMessage message={formErrors.permissionLevel || ''} />
          )}
        </InputContainer>
      </EditUserForm>

      <PermissionDescription />

      <PageBottom>
        <button className="create-entity" onClick={handleSaveUser}>
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

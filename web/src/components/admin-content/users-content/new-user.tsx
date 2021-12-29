import React from 'react';
import Select from 'react-select';

import Link from 'next/link';
import api from 'services/api';
import router from 'next/router';

import { toast } from 'react-toastify';
import { Container, NewUserForm } from './styles';
import { Input, InputContainer, PageBottom } from '../styles';

import { patterns } from 'helpers/patterns';

import { useTheme } from 'styled-components';
import { lighten } from 'polished';
import { ErrorMessage } from 'components/error-message';
import { useCategoryList } from 'hooks/useCategoryList';
import { useUserList } from 'hooks/useUserList';
import { PermissionDescription } from './permission-description';

interface FormProps {
  name: string;
  email: string;
  category: string;
  permissionLevel: number | string;
}

const ManageNewUser = () => {
  const { allCategories } = useCategoryList();
  const { allUsers, mutateUsers } = useUserList();

  const defaultTheme = useTheme();

  const [formErrors, setFormErrors] = React.useState({} as FormProps);
  const [formData, setFormData] = React.useState({} as FormProps);

  const saveUser = async (data: FormProps) => {
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

  const resetForm = () => {
    setFormData({ name: '', email: '', permissionLevel: '', category: '' });
  };

  const isFormValid = () => {
    const { name, email, permissionLevel, category } = formData;

    let isValid = true;

    // reset form errors
    setFormErrors({ name: '', email: '', permissionLevel: '', category: '' });

    if (!name?.length) {
      const message = 'O título é obrigatório';
      setFormErrors((prev) => ({ ...prev, title: message }));

      isValid = false;
    }

    if (!email?.length) {
      const message = 'A descrição é obrigatória';
      setFormErrors((prev) => ({ ...prev, description: message }));

      isValid = false;
    }

    if (!patterns.email.test(email)) {
      const message = 'Email inválido';
      setFormErrors((prev) => ({ ...prev, email: message }));

      isValid = false;
    }

    if (!category?.length) {
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

    const newUser = await saveUser(formData);

    router.push('/admin/users').then(() => {
      mutateUsers([...allUsers, newUser], true);
    });
  };

  const handleSaveUserAndNew = () => {
    const isValid = isFormValid();

    if (!isValid) return;

    saveUser(formData);

    resetForm();
  };

  const categoriesOptions = allCategories.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  const selectValue = allCategories.find(
    (category) => category._id === formData.category
  );

  return (
    <Container>
      <NewUserForm>
        <InputContainer label="Nome do usuário">
          <Input
            placeholder="Nome do usuário"
            value={formData.name}
            onChange={(ev) => setFormData((prev) => ({ ...prev, name: ev.target.value }))}
          />

          {formErrors?.name && <ErrorMessage message={formErrors.name || ''} />}
        </InputContainer>

        <InputContainer label="Email do usuário">
          <Input
            value={formData.email}
            onChange={(ev) =>
              setFormData((prev) => ({ ...prev, email: ev.target.value }))
            }
          />

          {formErrors?.email && <ErrorMessage message={formErrors.email || ''} />}
        </InputContainer>

        <InputContainer label="Categoria do usuário">
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

        <InputContainer label="Nível de permissão">
          <Input
            value={formData.permissionLevel}
            type="number"
            onChange={(ev) =>
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
      </NewUserForm>

      <PermissionDescription />

      <PageBottom>
        <button className="create-entity" onClick={handleSaveUser}>
          Salvar
        </button>

        <button className="create-entity_new" onClick={handleSaveUserAndNew}>
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

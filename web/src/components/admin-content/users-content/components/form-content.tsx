import React from 'react';

import { useTheme } from 'styled-components';
import { InputContainer, Input } from '../../styles';
import { useCategoryList } from 'hooks/useCategoryList';

import Select from 'react-select';
import { useUserList } from 'hooks/useUserList';

interface UserFormContentProps {
  setFormData: React.Dispatch<React.SetStateAction<UserFormProps>>;
  formData: UserFormProps;
}

const UserFormContent: React.FC<UserFormContentProps> = ({ formData, setFormData }) => {
  const { allUsers } = useUserList();
  const { allCategories } = useCategoryList();
  const defaultTheme = useTheme();

  // const [formData, setFormData] = React.useState({} as UserFormProps);

  React.useEffect(() => setFormData(formData as UserFormProps), [formData]);

  const updateForm = () => setFormData(formData);

  // managerSelectValue
  const managersOptions = allUsers.map((user) => ({
    value: user._id,
    label: user.name,
  }));

  const categoriesOptions = allCategories.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  const categorySelectValue = categoriesOptions.filter((category) =>
    formData?.category?.includes(category.value)
  );

  const managerSelectValue = managersOptions.filter((manager) =>
    formData?.manager?.includes(manager.value)
  );

  return (
    <>
      <InputContainer label="Nome do usuário*">
        <Input
          onBlur={updateForm}
          value={formData?.name || ''}
          onChange={(ev) => setFormData((prev) => ({ ...prev, name: ev.target.value }))}
        />
      </InputContainer>

      <InputContainer label="Email do usuário*">
        <Input
          onBlur={updateForm}
          value={formData?.email || ''}
          onChange={(ev) => setFormData((prev) => ({ ...prev, email: ev.target.value }))}
        />
      </InputContainer>

      <InputContainer label="Categoria do usuário*">
        <Select
          isMulti
          onBlur={updateForm}
          value={categorySelectValue || null}
          placeholder=""
          className="category-select"
          classNamePrefix="category-select"
          onChange={(val) => {
            const categories = val.map((c) => c.value).join(',');
            setFormData((prev) => ({ ...prev, category: categories || '' }));
          }}
          options={categoriesOptions}
          theme={defaultTheme.select_default}
        />
      </InputContainer>

      <InputContainer label="Gerente do usuário">
        <Select
          // isMulti
          onBlur={updateForm}
          value={managerSelectValue || null}
          placeholder=""
          className="category-select"
          classNamePrefix="category-select"
          onChange={(val) => {
            // const categories = val.map((c) => c.value).join(',');
            setFormData((prev) => ({ ...prev, manager: val?.value || '' }));
          }}
          options={managersOptions}
          theme={defaultTheme.select_default}
        />
      </InputContainer>

      <InputContainer label="Nível de permissão*">
        <Input
          onBlur={updateForm}
          value={formData?.permissionLevel || ''}
          type="number"
          onChange={(ev) =>
            setFormData((prev) => ({
              ...prev,
              permissionLevel: Number(ev.target.value),
            }))
          }
        />
      </InputContainer>
    </>
  );
};

export default UserFormContent;

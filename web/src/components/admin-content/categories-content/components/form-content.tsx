import React from 'react';
import Select from 'react-select';

import { InputContainer, Input, Textarea } from 'components/admin-content/styles';
import { useTheme } from 'styled-components';

interface CategoryFormContentProps {
  setFormData: React.Dispatch<React.SetStateAction<CategoryFormProps>>;
  formData: CategoryFormProps;
}

const CategoryFormContent: React.FC<CategoryFormContentProps> = ({
  formData,
  setFormData,
}) => {
  const defaultTheme = useTheme();

  const priorityOptions = [
    { value: 'high', label: 'Prioridade alta' },
    { value: 'medium', label: 'Prioridade média' },
    { value: 'low', label: 'Prioridade baixa' },
  ];

  React.useEffect(() => setFormData(formData as CategoryFormProps), [formData]);

  const selectValue = priorityOptions.find(
    (priority) => priority.value === formData?.priority
  );

  return (
    <>
      <InputContainer label="Nome da categoria*">
        <Input
          value={formData?.name || ''}
          onChange={(ev) => setFormData((prev) => ({ ...prev, name: ev.target.value }))}
        />
      </InputContainer>

      <InputContainer label="Prioridade da categoria*">
        <Select
          value={selectValue || null}
          placeholder=""
          className="category-select"
          classNamePrefix="category-select"
          onChange={(val) =>
            setFormData((prev) => ({ ...prev, priority: val?.value || '' }))
          }
          options={priorityOptions}
          theme={defaultTheme.select_default}
        />
      </InputContainer>

      <InputContainer
        label="Descrição da categoria*"
        style={{ gridColumn: '1 / span 3' }}
      >
        <Textarea
          value={formData?.description || ''}
          onChange={(ev) =>
            setFormData((prev) => ({ ...prev, description: ev.target.value }))
          }
        />
      </InputContainer>
    </>
  );
};

export default CategoryFormContent;

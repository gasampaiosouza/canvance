import React from 'react';
import Select from 'react-select';

import { InputContainer, Input, Textarea } from 'components/admin-content/styles';
import { useTheme } from 'styled-components';
import { useCategoryList } from 'hooks/useCategoryList';

interface TaskFormContentProps {
  setFormData: React.Dispatch<React.SetStateAction<TaskFormProps>>;
  formData: TaskFormProps;
}

const TaskFormContent: React.FC<TaskFormContentProps> = ({ formData, setFormData }) => {
  const { allCategories } = useCategoryList();
  const defaultTheme = useTheme();

  React.useEffect(() => setFormData(formData as TaskFormProps), [formData]);

  const categoriesOptions = allCategories.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  const selectValue = categoriesOptions.filter((category) =>
    formData?.category?.includes(category.value)
  );

  return (
    <>
      <InputContainer label="Título da tarefa*">
        <Input
          value={formData?.title || ''}
          onChange={(ev) => setFormData((prev) => ({ ...prev, title: ev.target.value }))}
        />
      </InputContainer>

      <InputContainer label="Categoria da tarefa*">
        <Select
          isMulti
          value={selectValue || null}
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

      <InputContainer label="Relevância*">
        <Input
          value={formData?.relevance || ''}
          type="number"
          onChange={(ev) =>
            setFormData((prev) => ({ ...prev, relevance: Number(ev.target.value) }))
          }
        />
      </InputContainer>

      <InputContainer style={{ gridColumn: '1 / span 3' }} label="Descrição da tarefa*">
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

export default TaskFormContent;

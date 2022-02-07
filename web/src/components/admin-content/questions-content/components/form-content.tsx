import React from 'react';
import Select from 'react-select';

import { InputContainer, Input } from 'components/admin-content/styles';
import { useTheme } from 'styled-components';
import { useCategoryList } from 'hooks/useCategoryList';
import { AnswersContainer } from '../styles';

import { Close } from '@styled-icons/material-rounded';

interface QuestionFormContentProps {
  setFormData: React.Dispatch<React.SetStateAction<QuestionFormProps>>;
  formData: QuestionFormProps;
}

const QuestionFormContent: React.FC<QuestionFormContentProps> = ({
  formData,
  setFormData,
}) => {
  const { allCategories } = useCategoryList();
  const defaultTheme = useTheme();

  const [writingAnswer, setWritingAnswer] = React.useState('');

  React.useEffect(() => setFormData(formData as QuestionFormProps), [formData]);

  const typeOptions = [
    { value: 'essay', label: 'Dissertativa' },
    { value: 'multiple', label: 'Múltipla escolha' },
  ];

  const categoriesOptions = allCategories.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  const typeDefaultValue = typeOptions.find((type) => type.value === formData?.type);

  const selectValue = categoriesOptions.filter((category) =>
    formData?.category?.includes(category.value)
  );

  function handleAnswerDelete(value: string) {
    const index = formData.answers.indexOf(value);

    setFormData((prev) => {
      const answers = prev.answers;

      answers.splice(index, 1);

      return { ...prev, answers };
    });
  }

  function handleAnswerRegister(ev: React.KeyboardEvent<HTMLInputElement>) {
    if (ev.key != 'Enter') return;

    setFormData((prev) => {
      const answers = [...prev.answers, writingAnswer];

      return { ...prev, answers: answers };
    });

    setWritingAnswer('');
  }

  return (
    <>
      <InputContainer label="Título da pergunta*">
        <Input
          value={formData?.label || ''}
          onChange={(ev) => setFormData((prev) => ({ ...prev, label: ev.target.value }))}
        />
      </InputContainer>

      <InputContainer label="Categoria da pergunta*">
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

      <InputContainer label="Tipo da pergunta*">
        <Select
          value={typeDefaultValue || null}
          placeholder=""
          className="category-select"
          classNamePrefix="category-select"
          onChange={(val) => {
            setFormData((prev) => ({ ...prev, type: val?.value || '' }));
          }}
          options={typeOptions}
          theme={defaultTheme.select_default}
        />
      </InputContainer>

      {formData.type == 'multiple' && (
        <AnswersContainer style={{ gridRow: 3, gridColumn: '1 / 3' }}>
          <InputContainer label="Respostas da pergunta">
            <Input
              value={writingAnswer}
              onChange={(ev) => setWritingAnswer(ev.target.value)}
              onKeyDown={handleAnswerRegister}
            />
          </InputContainer>
          <span className="enter-hint">Pressione ENTER para cadastrar</span>

          <div className="registered-answers">
            <h4>Respostas cadastradas:</h4>

            <div className="registered-answers_container">
              {formData.answers.length ? (
                formData.answers.map((answer, index) => (
                  <div className="registered-answers_item" key={index}>
                    {answer}{' '}
                    <div
                      className="close-icon"
                      onClick={() => handleAnswerDelete(answer)}
                    >
                      <Close />
                    </div>
                  </div>
                ))
              ) : (
                <p className="empty-answers">Nenhuma resposta cadastrada.</p>
              )}
            </div>
          </div>
        </AnswersContainer>
      )}
    </>
  );
};

export default QuestionFormContent;

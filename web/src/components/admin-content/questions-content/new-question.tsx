import React from 'react';

import Link from 'next/link';
import api from 'services/api';
import router from 'next/router';

import { toast } from 'react-toastify';
import { Container, NewQuestionForm } from './styles';
import { PageBottom } from '../styles';

import QuestionFormContent from './components/form-content';
import handleFormValidation from './components/handleFormValidation';
import { useSWRConfig } from 'swr';

const ManageNewQuestion = () => {
  const { mutate } = useSWRConfig();
  const [formData, setFormData] = React.useState({} as QuestionFormProps);

  const resetForm = () => {
    setFormData({ label: '', type: '', answers: [], category: '' });
  };

  const validateBeforeSaving = (callback: Function) => {
    const { isValid, formErrors } = handleFormValidation(formData);

    if (!isValid) {
      Object.values(formErrors).map((message) => toast.error(message));
      return;
    }

    callback(formData);
  };

  const saveQuestion = async (data: QuestionFormProps) => {
    try {
      const response = await api.post('/questions', data);

      toast.success('Tarefa criada com sucesso!');

      return response.data;
    } catch (err) {
      toast.error('Ocorreu um erro ao tentar criar a tarefa.');
    }
  };

  const handleSaveQuestion = async () => {
    await saveQuestion(formData);

    router.push('/admin/questions').then(() => {
      mutate('/questions');
    });
  };

  const handleSaveQuestionAndNew = () => {
    saveQuestion(formData);

    resetForm();
  };

  return (
    <Container>
      <NewQuestionForm>
        <QuestionFormContent formData={formData} setFormData={setFormData} />
      </NewQuestionForm>

      <PageBottom>
        <button
          className="create-question"
          onClick={() => validateBeforeSaving(handleSaveQuestion)}
        >
          Salvar
        </button>

        <div>
          <button
            className="create-question_new"
            onClick={() => validateBeforeSaving(handleSaveQuestionAndNew)}
          >
            Salvar e novo
          </button>

          <Link href="/admin/questions">
            <a className="create-question_cancel">Cancelar</a>
          </Link>
        </div>
      </PageBottom>
    </Container>
  );
};

export default ManageNewQuestion;

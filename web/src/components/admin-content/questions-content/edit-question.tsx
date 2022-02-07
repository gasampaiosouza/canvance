import React from 'react';

import Link from 'next/link';
import api from 'services/api';
import router from 'next/router';

import { toast } from 'react-toastify';
import { Container, EditQuestionForm } from './styles';
import { PageBottom } from '../styles';

import { pick } from 'lodash';
import handleFormValidation from './components/handleFormValidation';
import { useSWRConfig } from 'swr';
import { IQuestion } from '@/interfaces';
import QuestionFormContent from './components/form-content';

interface IProps {
  questionId: string;
}

const ManageEditQuestion: React.FC<IProps> = ({ questionId }) => {
  const { mutate } = useSWRConfig();

  const [formData, setFormData] = React.useState({} as QuestionFormProps);

  React.useEffect(() => {
    async function getCurrentQuestion() {
      const { data } = await api.get<IQuestion>(`/questions/${questionId}`);

      const formDataPick = pick(data, ['category', 'type', 'label', 'order', 'answers']);

      setFormData({
        ...formDataPick,
        category: data.category.map((cat) => cat._id).join(','),
      });
    }

    getCurrentQuestion();
  }, []);

  const saveQuestion = async (data: QuestionFormProps) => {
    try {
      const response = await api.put(`/questions/${questionId}`, data);

      toast.success('Pergunta atualizada com sucesso!');

      return response.data;
    } catch (err) {
      toast.error('Ocorreu um erro ao tentar atualizar a pergunta.');
    }
  };

  const handleSaveQuestion = async () => {
    const { isValid, formErrors } = handleFormValidation(formData);

    if (!isValid) {
      Object.values(formErrors).map((message) => toast.error(message));
      return;
    }

    await saveQuestion(formData);

    router.push('/admin/questions').then(() => mutate('/questions'));
  };

  console.log('sim');

  console.log(formData);

  return (
    <Container>
      <EditQuestionForm>
        <QuestionFormContent formData={formData} setFormData={setFormData} />
      </EditQuestionForm>

      <PageBottom>
        <button className="create-task" onClick={handleSaveQuestion}>
          Salvar
        </button>

        <Link href="/admin/questions">
          <a className="create-task_cancel">Cancelar</a>
        </Link>
      </PageBottom>
    </Container>
  );
};

export default ManageEditQuestion;

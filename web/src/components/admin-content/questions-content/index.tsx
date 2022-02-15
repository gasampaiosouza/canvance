import React from 'react';
import Link from 'next/link';

import { IQuestion } from '@/interfaces';
import { toast } from 'react-toastify';
import { Container } from './styles';

import { GridContextProvider, GridDropZone, GridItem, swap } from 'react-grid-dnd';

import api from 'services/api';
import { Box, BoxesContainer, PageHeader } from '../styles';
import { useFetch } from 'hooks/useFetch';
import QuestionBox from './question-box';

const ManageQuestionsContent: React.FC = () => {
  const { data: questions = [], mutate } = useFetch<IQuestion[]>('/questions');

  React.useEffect(() => {
    toast.info(
      'Você pode arrastar as perguntas para alterar a ordem de exibição no questionário.'
    );
  }, []);

  const handleDeleteQuestion = async (questionId: string) => {
    try {
      // first, we need to put the question as the last one (by order)
      // const question = questions.find((q) => q._id == questionId);
      // const lastQuestion = {
      //   ...questions.at(-1),
      //   order: question!.order,
      // };

      // await api.put(`/questions/${question!._id}`, question);
      // await api.put(`/questions/${lastQuestion!._id}`, lastQuestion);

      await api.delete(`/questions/${questionId}`);

      toast.success('Pergunta removida com sucesso');

      const currentQuestions = questions?.filter(
        (question) => question._id !== questionId
      );

      mutate(currentQuestions);
    } catch (error) {
      console.log(error);
      toast.error('Erro ao remover a pergunta');
    }
  };

  async function handleDragEnd(
    sourceId: string,
    sourceIndex: number,
    targetIndex: number,
    targetId?: string
  ) {
    if (sourceIndex === targetIndex) return;

    const nextState = swap(questions, sourceIndex, targetIndex);
    const oldOrder = questions.find((question) => question.order == targetIndex + 1);

    const oldOrderUpdatedQuestion = { ...oldOrder, order: sourceIndex + 1 };
    const updatedTask = { ...nextState[targetIndex], order: targetIndex + 1 };

    if (!oldOrderUpdatedQuestion || !updatedTask) return;

    mutate(nextState);

    await api.put(`/questions/${oldOrderUpdatedQuestion._id}`, oldOrderUpdatedQuestion);
    await api.put(`/questions/${updatedTask._id}`, updatedTask);

    mutate(nextState);
  }

  return (
    <Container>
      <PageHeader>
        <h2>Todas as Perguntas</h2>

        <Link href="/admin/questions/new">
          <a className="new-button">Nova Pergunta</a>
        </Link>
      </PageHeader>

      <GridContextProvider onChange={handleDragEnd}>
        <BoxesContainer className="questions-container" style={{ display: 'block' }}>
          <GridDropZone
            id="questions"
            className="questions-dropzone"
            boxesPerRow={4}
            rowHeight={190}
          >
            {questions!.map((question, index) => (
              <QuestionBox
                question={question}
                key={question?._id}
                handleDeletion={handleDeleteQuestion}
              />
            ))}
          </GridDropZone>
        </BoxesContainer>
      </GridContextProvider>
    </Container>
  );
};

export default ManageQuestionsContent;

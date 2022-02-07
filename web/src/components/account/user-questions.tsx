import React from 'react';

import { IQuestionAnswered } from '@/interfaces';
import { useAuth } from 'hooks/useAuth';
import { useFetch } from 'hooks/useFetch';
import { UserQuestionsContainer } from './styles';

const UserQuestionSettings = () => {
  const { user } = useAuth();
  const { data } = useFetch<IQuestionAnswered[]>(`/questions-answered/user/${user?._id}`);

  const questions = data?.at(0);

  return (
    <UserQuestionsContainer>
      {questions?.questions?.map(({ question, answer }) => {
        const questionLabel = question.label;

        return (
          <div key={question._id} className="question-item">
            <h2>{questionLabel}</h2>
            <p>{answer}</p>
          </div>
        );
      })}
    </UserQuestionsContainer>
  );
};

export default UserQuestionSettings;

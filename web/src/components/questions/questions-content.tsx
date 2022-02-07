import { IQuestion, IQuestionAnswered } from '@/interfaces';
import React from 'react';
import { QuestionContent, QuestionsContainer } from './styles';

import { ArrowBackIos } from '@styled-icons/material-rounded';
import { useAuth } from 'hooks/useAuth';
import api from 'services/api';
import { toast } from 'react-toastify';

import router from 'next/router';

interface Props {
  questions: IQuestion[];
}

/*
{
  answers: [] || ['Sim', 'Não']
  category: "616cc2bdcc3dd3a6e2bb0b03"
  label: "Você se acha divertido?"
  order: 1
  type: "essay" | "multiple"
  __v: 0
  _id: "61f71f68d3836bd7521db70a"
}
*/

interface QuestionsToSaveType {
  user: string;
  questions: { question: string; answer: string }[];
}

const QuestionsContent: React.FC<Props> = ({ questions }) => {
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = React.useState(1);
  const [questionsData, setQuestionsData] = React.useState<QuestionsToSaveType>({
    user: user?._id || '',
    questions: [],
  });

  const isLastQuestion = currentQuestion == questions.length - 1;

  const updateQuestion = (quantity: number) => {
    //...

    setCurrentQuestion((prev) => {
      const newQuestion = prev + quantity;

      if (newQuestion < 1) return 1;
      if (newQuestion >= questions.length) return questions.length - 1;

      return newQuestion;
    });
  };

  const saveQuestionToState = (value: string, questionId: string) => {
    const newQuestion = { question: questionId, answer: value.trim() };
    const questionsToSave = questionsData.questions.filter(
      ({ question }) => question !== questionId
    );

    const saveToState = (prev: QuestionsToSaveType) => ({
      ...prev,
      questions: [...questionsToSave, newQuestion],
    });

    setQuestionsData(saveToState);
  };

  const saveQuestions = async () => {
    const confirmation = window.confirm('Deseja mesmo enviar suas respostas?');

    if (!confirmation) return;

    try {
      await api.post<IQuestionAnswered>('/questions-answered', questionsData);

      toast.success('Respostas salvas com sucesso!');
      router.push('/account/questions');
    } catch (error) {
      console.log(error);
      toast.error('Ocorreu um erro ao salvar as respostas.');
    }
  };

  return (
    <>
      <span className="total-counter">
        Total:{' '}
        <strong>
          {currentQuestion} / {questions.length - 1}
        </strong>
      </span>

      <QuestionsContainer>
        <QuestionContent>
          {questions.map((question, index) => {
            const questionType = question.type;
            const isCurrentQuestion = currentQuestion == index + 1;

            return (
              <div
                className={`question-container ${isCurrentQuestion ? 'active' : ''}`}
                key={question._id}
              >
                <h2>{question.label}</h2>

                {questionType == 'essay' && (
                  <textarea
                    onBlur={(ev) =>
                      saveQuestionToState(ev.target.value, question?._id || '')
                    }
                  />
                )}

                {questionType == 'multiple' && (
                  <>
                    <div>
                      {question.answers.map((answer, index) => (
                        <label className="b-contain" key={index}>
                          <span>{answer}</span>
                          <input
                            type="radio"
                            value={answer}
                            name={question.label}
                            onChange={(ev) =>
                              saveQuestionToState(ev.target.value, question?._id || '')
                            }
                          />
                          <div className="b-input"></div>
                        </label>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}

          <div className="buttons-container">
            <button className="prev-question" onClick={() => updateQuestion(-1)}>
              {currentQuestion > 1 && (
                <>
                  <ArrowBackIos /> Voltar
                </>
              )}
            </button>

            <button
              className="next-question default-button"
              onClick={isLastQuestion ? saveQuestions : () => updateQuestion(1)}
            >
              {isLastQuestion ? 'Finalizar' : 'Próxima'}
            </button>
          </div>
        </QuestionContent>
      </QuestionsContainer>
    </>
  );
};

export default QuestionsContent;

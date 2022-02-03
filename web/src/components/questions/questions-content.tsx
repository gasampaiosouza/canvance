import { IQuestion } from '@/interfaces';
import React from 'react';
import { QuestionContent, QuestionsContainer } from './styles';

import { ArrowBackIos } from '@styled-icons/material-rounded';

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

const QuestionsContent: React.FC<Props> = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = React.useState(1);

  console.log(questions);

  const updateQuestion = (quantity: number) => {
    //...

    setCurrentQuestion((prev) => {
      const newQuestion = prev + quantity;

      if (newQuestion < 1) return 1;
      if (newQuestion >= questions.length) return questions.length - 1;

      return newQuestion;
    });
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

                {questionType == 'essay' && <textarea />}

                {questionType == 'multiple' && (
                  <>
                    <div>
                      {question.answers.map((answer, index) => (
                        <label className="b-contain" key={index}>
                          <span>{answer}</span>
                          <input type="radio" value={answer} name={question.label} />
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
              <ArrowBackIos /> Voltar
            </button>

            <button
              className="next-question default-button"
              onClick={() => updateQuestion(1)}
            >
              Próximo
            </button>
          </div>
        </QuestionContent>
      </QuestionsContainer>
    </>
  );
};

export default QuestionsContent;

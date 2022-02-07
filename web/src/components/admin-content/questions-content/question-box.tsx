import { IQuestion } from '@/interfaces';
import React from 'react';
import { GridItem } from 'react-grid-dnd';
import { Box } from '../styles';

import { DeleteOutline as DeleteIcon } from '@styled-icons/material-rounded';

import Link from 'next/link';

import { DragIndicator } from '@styled-icons/material-rounded';

interface IProps {
  question: IQuestion;
  handleDeletion: (questionId: string) => void;
}

const QuestionBox: React.FC<IProps> = ({ question, handleDeletion }) => {
  return (
    <GridItem className="question-item">
      <Link href={`/admin/questions/edit/${question._id}`}>
        <Box className="question-box">
          <span className="question-drag" title="Clique e arraste">
            <DragIndicator />
          </span>
          <span className="question-order">{question.order}</span>
          <h3 className="question-label">{question.label}</h3>

          <p className="question-description">
            Tipo de pergunta:{' '}
            <strong>
              {question?.type === 'essay' ? 'Dissertativa' : 'Múltipla Escolha'}
            </strong>
          </p>

          <div className="question-bottom">
            <span className="question-category">
              {question.category?.map((cat) => cat.name).join(', ')}
            </span>
            <span
              className="question-delete"
              onClick={(ev) => {
                ev.preventDefault();
                ev.stopPropagation();

                const confirmQuestionDeletion = window.confirm(
                  'Quer mesmo remover a Pergunta?'
                );

                if (!confirmQuestionDeletion) return;

                handleDeletion(question._id || '');
              }}
            >
              <DeleteIcon />
            </span>
          </div>
        </Box>
      </Link>
    </GridItem>
  );
};

export default QuestionBox;

import styled from 'styled-components';

export const Container = styled.section`
  /* height: 100%; */

  > h2 {
    text-transform: uppercase;
  }

  .question-order {
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 0 3px 0 5px;
    font-size: 0.7rem;
    font-weight: 700;
    transition: 0.2s ease-in-out;

    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
    padding: 0.5rem;
  }

  .question-label {
    font-size: 1.1rem;
    max-width: 90%;
    line-height: 1.4;
  }

  .question-description {
    margin-top: 0.5rem;
    font-size: 0.75rem;
  }

  .question-bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .question-delete {
      color: ${({ theme }) => theme.colors.error};
      border: 1px solid ${({ theme }) => theme.colors.error};
      padding: 0.25rem;
      border-radius: 50px;
      transition: 0.2s ease-in-out;

      &:hover {
        background: ${({ theme }) => theme.colors.error};
        color: ${({ theme }) => theme.colors.background};
      }

      svg {
        width: 18px;
      }
    }
  }

  .question-drag {
    position: absolute;
    width: 30px;
    left: 0.5rem;
    top: 0.5rem;

    color: ${({ theme }) => theme.colors.text_soft};
  }

  .question-category {
    display: block;
    margin-top: 1rem;
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;

    align-self: flex-end;
  }

  .questions-container {
    display: flex;
    touch-action: none;
  }

  .question-box {
    font-size: 0.85rem;
    height: 100%;
    padding: 2.75rem 1rem 1rem;
  }

  .question-item {
    padding: 0.5rem;
  }

  .questions-dropzone {
    flex: 1;
    height: 400px;
  }

  .enter-hint {
    display: block;
    color: ${({ theme }) => theme.colors.text_soft};

    text-align: right;
    font-size: 0.8rem;
    margin-top: 0.5rem;
  }
`;

// new question
export const NewQuestionForm = styled.section`
  max-width: 50%;
  margin: 0 auto;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  padding-bottom: 82px;
`;

// edit question
export const EditQuestionForm = styled(NewQuestionForm)`
  //...
`;

export const AnswersContainer = styled.div`
  .registered-answers {
    margin-top: 2rem;

    .empty-answers {
      color: ${({ theme }) => theme.colors.text_soft};
      font-size: 0.9rem;
    }

    h4 {
      color: ${({ theme }) => theme.colors.text_soft};
      font-weight: 500;
      margin-bottom: 1rem;
      font-size: 1rem;
    }

    &_container {
      display: flex;

      gap: 1rem;
    }

    &_item {
      font-size: 0.9rem;
      padding-left: 1rem;
      border-radius: 4px;

      border: 1px solid ${({ theme }) => theme.colors.border};

      display: flex;
      align-items: center;

      .close-icon {
        height: 30px;
        padding: 0.5rem;

        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0 4px 4px 0;

        margin-left: 2rem;
        cursor: pointer;

        color: ${({ theme }) => theme.colors.background};
        background: ${({ theme }) => theme.colors.primary};

        transition: 0.2s ease-in-out;

        :hover {
          filter: brightness(1.1);

          svg {
            transform: rotate(90deg);
          }
        }

        svg {
          transition: 0.3s ease-in-out;
          width: 18px;
        }
      }
    }
  }
`;

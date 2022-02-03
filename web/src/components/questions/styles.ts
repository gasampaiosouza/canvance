import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f8f8f8;

  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='6' style='opacity: 0.3' height='6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 0h1L0 6V5zm1 5v1H5z' fill='%230074d9' fill-opacity='.22' fill-rule='evenodd'/%3E%3C/svg%3E");

  height: 100%;

  h1 {
    font-size: 1.75rem;
    margin-bottom: 1.25rem;
  }

  strong {
    color: ${(props) => props.theme.colors.primary};
  }

  .total-counter {
    align-self: flex-end;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }
`;

export const Limiter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 550px;
  height: 100%;
`;

export const QuestionsContainer = styled.div`
  text-align: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);

  padding: 1.5rem 1.75rem;
  border-radius: 8px;
  background: ${(props) => props.theme.colors.background};

  width: 100%;
  min-height: 315px;

  p {
    color: ${(props) => props.theme.colors.text_soft};
    margin-bottom: 0.5rem;
  }

  button {
    margin-top: 1.5rem;
  }
`;

export const QuestionContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: space-between;

  .question-container {
    width: 100%;
    display: none;

    &.active {
      display: block;
    }
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 1.5rem;
  }

  textarea {
    border: 1px solid #e7e7e7;
    resize: none;
    width: 100%;
    min-height: 150px;
    padding: 1rem;
    border-radius: 5px;

    font-size: 0.9rem;

    :focus {
      outline: 1px solid #e2e2e2;
    }
  }

  .buttons-container {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .prev-question {
      display: flex;
      align-items: center;
      border: 0;
      background: transparent;

      font-size: 0.9rem;

      color: ${(props) => props.theme.colors.text_soft};
      font-size: 0.9rem;

      svg {
        min-width: 20px;
      }
    }
  }
`;

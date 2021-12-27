import styled from 'styled-components';

export const Container = styled.section`
  text-align: center;
  height: 100%;

  > h2 {
    text-transform: uppercase;
  }
`;

export const BoxesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;

  /* column-count: 4; */
  /* height: 100%; */

  margin-top: 2rem;
`;

export const Box = styled.a`
  position: relative;
  cursor: pointer;

  background: ${({ theme }) => theme.colors.background};
  box-shadow: 2px 2px 5px rgba(204, 204, 204, 0.5);
  padding: 1rem;
  border-radius: 5px;

  text-align: left;

  font-size: 0.6rem;
  border: 1px solid ${({ theme }) => theme.colors.border};

  transition: 0.2s ease-in-out;

  display: inline-block;

  /* width: 100%;
  margin-bottom: 20px; */

  display: grid;
  grid-template-rows: repeat(3, 1fr);

  .task-relevance {
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 0 3px 0 5px;
    font-weight: 700;
    transition: 0.2s ease-in-out;

    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
    padding: 0.5rem;
  }

  .task-title {
    font-size: 1.1rem;
    max-width: 90%;
  }

  .task-description {
    margin-top: 0.5rem;
    font-size: 0.75rem;
  }

  .task-bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .task-delete {
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

  .task-category {
    display: block;
    margin-top: 1rem;
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;

    align-self: flex-end;
  }

  :hover {
    border: 1px solid ${({ theme }) => theme.colors.primary};

    /* * {
      color: ${({ theme }) => theme.colors.background};
    } */

    .task-relevance {
      filter: brightness(1.15);
    }
  }
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .new-task_button {
    cursor: pointer;

    color: ${({ theme }) => theme.colors.background};
    background: ${({ theme }) => theme.colors.primary};

    border: none;
    border-radius: 5px;

    padding: 0.5rem 1rem;

    font-size: 0.8rem;
    font-weight: 700;

    transition: 0.2s ease-in-out;

    :hover {
      filter: brightness(1.15);
    }
  }
`;

// new task
export const NewTaskForm = styled.section`
  max-width: 50%;
  margin: 0 auto;

  display: grid;
  grid-template-columns: 1fr 0.5fr 110px;
  gap: 1rem;

  padding-bottom: 82px;

  // select
  .category-select__control {
    height: 100%;
    min-height: 45px;
    text-align: left;
    border-color: ${({ theme }) => theme.colors.border};

    :hover {
      border-color: ${({ theme }) => theme.colors.border};
    }
  }

  .category-select__placeholder,
  .category-select__single-value,
  .category-select__option {
    font-size: 0.9rem;
  }
`;

export const PageBottom = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  justify-content: flex-end;
  gap: 1rem;

  background: ${({ theme }) => theme.colors.background};
  padding: 1.56rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  button,
  a {
    cursor: pointer;

    color: ${({ theme }) => theme.colors.background};
    background: ${({ theme }) => theme.colors.primary};

    border: none;
    border-radius: 5px;

    padding: 0.5rem 1rem;

    font-size: 0.8rem;
    font-weight: 700;

    transition: 0.2s ease-in-out;

    :hover {
      filter: brightness(1.15);
    }
  }
`;

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  /* align-items: center; */

  /* margin-bottom: 0.25rem; */
  text-align: left;

  > span {
    /* position: absolute; */
    /* bottom: -1rem; */
    margin-top: 0.5rem;
  }

  &.has-error {
    > input,
    > textarea,
    .category-select__control {
 
    border-color: ${({ theme }) => theme.colors.error};
  }

  &.is-valid {
    > input,
    > textarea,
    .category-select__control {

    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Input = styled.input`
  font-size: 0.9rem;
  width: 100%;
  padding: 0.8rem 1rem;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;

  transition: 0.2s ease-in-out;

  outline: 0;

  -moz-appearance: textfield;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus,
  :-webkit-autofill:active {
    box-shadow: 0 0 0 30px white inset !important;
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }
`;

export const Textarea = styled.textarea`
  font-size: 0.9rem;
  width: 100%;

  padding: 1rem;
  min-height: 10rem;
  min-width: 100%;
  max-width: 100%;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;

  transition: 0.2s ease-in-out;

  outline: 0;

  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus,
  :-webkit-autofill:active {
    box-shadow: 0 0 0 30px white inset !important;
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }
`;

// edit task
export const EditTaskForm = styled.form`
  max-width: 50%;
  margin: 0 auto;

  display: grid;
  grid-template-columns: 1fr 0.5fr 110px;
  gap: 1rem;

  padding-bottom: 82px;

  // select
  .category-select__control {
    height: 100%;
    min-height: 45px;
    text-align: left;
    border-color: ${({ theme }) => theme.colors.border};

    :hover {
      border-color: ${({ theme }) => theme.colors.border};
    }
  }

  .category-select__placeholder,
  .category-select__single-value,
  .category-select__option {
    font-size: 0.9rem;
  }
`;

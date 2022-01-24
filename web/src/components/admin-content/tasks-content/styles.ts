import styled from 'styled-components';

export const Container = styled.section`
  /* height: 100%; */

  > h2 {
    text-transform: uppercase;
  }

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
    line-height: 1.4;
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
`;

// new task
export const NewTaskForm = styled.section`
  max-width: 50%;
  margin: 0 auto;

  display: grid;
  grid-template-columns: 1fr 1fr 110px;
  gap: 1rem;

  padding-bottom: 82px;
`;

// edit task
export const EditTaskForm = styled(NewTaskForm)`
  //...
`;

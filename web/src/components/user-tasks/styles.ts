import styled from 'styled-components';

import { Check, Close } from '@styled-icons/material-rounded';
import { darken, size } from 'polished';

export const Container = styled.section`
  margin-top: 2rem;

  .indicators-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const OverlayStyle = styled.div`
  background-color: rgba(0, 0, 0, 0.4) !important;
  z-index: 30;
`;

export const Title = styled.h2`
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 0.75rem;

  strong {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const List = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  list-style: none;
  gap: 1rem;
  margin-top: 2rem;
`;

export const ListItemContainer = styled.a`
  cursor: pointer;
  display: flex;
  align-items: center;
  line-height: 1.6;
  font-size: 0.95rem;
  border-radius: 2.5px;
  font-weight: 400;

  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};

  padding: 1rem;
  transition: 0.2s ease-in-out;

  :hover {
    border-color: ${({ theme }) => darken(0.1, theme.colors.primary)};
    /* background: ${({ theme }) => darken(0.02, theme.colors.white)}; */
    box-shadow: 2px 2px 8px rgba(204, 204, 204, 0.5);
  }
`;

export const ListItemIcon = styled.div``;

export const ListItemText = styled.span`
  font-size: 0.95rem;
`;

const defaultIconStyles = `
  color: white;
  border-radius: 50%;
  padding: 0.4rem;
  margin-right: 0.75rem;
  width: 40px;
`;

export const CompletedIcon = styled(Check)`
  ${defaultIconStyles}

  background: ${({ theme }) => theme.colors.success};
`;

export const UncompletedIcon = styled(Close)`
  ${defaultIconStyles}

  background: ${({ theme }) => theme.colors.error};
`;

// task modal
interface TaskStatusProps {
  completed: boolean;
}

export const TaskCompletedStatus = styled.div<TaskStatusProps>`
  display: flex;
  align-items: center;

  ::before {
    content: '';

    ${size(8)};

    margin-right: 0.5rem;

    background: ${({ completed, theme }) =>
      completed ? theme.colors.success : theme.colors.error};
    border-radius: 50%;
  }
`;

export const TaskModalContent = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.colors.background};

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  min-width: 50%;
  min-height: 200px;
  border-radius: 5px;
`;

export const TaskContentContainer = styled.div`
  margin: 0 auto;
  padding: 0.5rem 2rem 2rem;

  .modal-close {
    position: absolute;
    cursor: pointer;

    top: 0.75rem;
    right: 0.65rem;

    width: 1.5rem;
  }

  .modal-information {
    display: flex;
    align-items: center;

    gap: 0.75rem;

    padding: 1rem 0 0;
    font-size: 0.8rem;

    .modal-date {
      color: ${({ theme }) => theme.colors.text_soft};
    }
  }

  .file-dropzone {
    cursor: pointer;
    padding: 1rem;
    color: ${({ theme }) => theme.colors.text_soft};
    border: 1px dashed ${({ theme }) => theme.colors.border};
    font-size: 0.9rem;

    max-width: 300px;
    text-align: center;

    display: flex;
    align-items: center;
    justify-content: center;

    min-height: 150px;

    transition: 0.2s ease-in-out;

    :hover,
    &.active {
      color: ${({ theme }) => theme.colors.primary};
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }

  .observation-field {
    margin-top: 1rem;

    textarea {
      width: 100%;
      min-height: 200px;
      border: 1px solid ${({ theme }) => theme.colors.border};
      border-radius: 5px;
      padding: 1rem;
      font-size: 0.9rem;
      resize: none;

      outline: 1px solid ${({ theme }) => theme.colors.border};

      ::placeholder {
        color: ${({ theme }) => theme.colors.text_soft};
      }
    }
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.5rem;

    font-size: 0.9rem;

    .task-title {
      max-width: 80%;
      line-height: 1.3;
      font-weight: 500;
    }

    .task-finish {
      background: none;
      border: 1px solid ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.primary};
      margin-top: 0;

      align-self: flex-start;

      padding: 0.5rem 1rem;

      :hover {
        background: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.background};
      }
    }
  }

  .task-description {
    padding: 1rem 0;
    line-height: 1.5;
    color: ${({ theme }) => darken(0.2, theme.colors.text_soft)};
  }
`;

export const BackArrowContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 0;
  background: transparent;

  font-size: 0.8rem;
  margin-bottom: 1rem;

  transition: 0.2s ease-in-out;

  :hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    max-width: 15px;
  }
`;

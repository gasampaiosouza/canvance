import { darken } from 'polished';
import styled from 'styled-components';

import { Check, Close } from '@styled-icons/material-rounded';

export const Container = styled.section`
  display: grid;

  grid-template-columns: 1fr 5fr;
  gap: 3rem;
`;

export const MenuContainer = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  button {
    border: 0;
    background: none;
    font-size: 0.9rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
    border-radius: 5px;
    text-align: left;
    transition: 0.2s ease-in-out;
    padding: 0.5rem 1rem;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }

    &.active {
      color: ${({ theme }) => theme.colors.primary};
      /* background: ${({ theme }) => theme.colors.primary}; */
      outline: 1px solid ${({ theme }) => theme.colors.primary};
    }

    svg {
      margin-right: 0.5rem;
      width: 1rem;
    }
  }
`;

export const SelectedPageContainer = styled.div`
  > h3 {
    font-size: 1.4rem;
  }

  .profile-data {
    display: flex;
    margin-top: 1.5rem;
    border-collapse: collapse;

    tbody,
    td,
    tr {
      min-width: 200px;
    }

    tr:last-child td {
      border-color: ${({ theme }) => darken(0.2, theme.colors.border)};
    }

    td {
      padding: 0.75rem 1rem;
      font-size: 0.9rem;
      border-bottom: 1px solid ${({ theme }) => theme.colors.border};

      &:first-child {
        font-weight: 700;
      }
    }
  }
`;

// change password
export const ChangePasswordContainer = styled.section`
  width: 100%;
  height: 100%;
`;

export const ForgotPasswordContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding-top: 2rem;

  p {
    text-align: center;
  }

  span {
    font-size: 0.8rem;
    margin-top: 1.5rem;

    a {
      cursor: pointer;
      color: ${({ theme }) => theme.colors.primary};
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export const ChangePasswordForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 100%;

  /* background: coral; */
  background: #f6f7fa;

  .content {
    padding: 2rem 2.5rem;
    background: #fff;
    /* text-align: center; */
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(204, 204, 204, 0.75);

    h2 {
      font-size: 2rem;
      margin-bottom: 0.5rem;
      text-align: center;
    }

    p {
      font-size: 0.9rem;
      color: ${({ theme }) => theme.colors.text_soft};
      text-align: center;
    }
  }

  .token-submit {
    margin-top: 0;
  }

  .token-title {
    margin-bottom: 1rem;
  }
`;

const defaultIconStyles = `
  color: white;
  border-radius: 50%;
  padding: 0.4rem;
  margin-bottom: 1rem;
  width: 40px;
`;

interface CompletedIconProps {
  accountPage?: boolean;
}

export const CompletedIcon = styled(Check)<CompletedIconProps>`
  ${defaultIconStyles}

  background: ${({ theme }) => theme.colors.success};

  ${({ accountPage }) =>
    accountPage &&
    `
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 2rem;
  `}
`;

export const UncompletedIcon = styled(Close)`
  ${defaultIconStyles}

  background: ${({ theme }) => theme.colors.error};
`;

// input email to change password
export const InputEmailContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 100%;

  /* background: coral; */
  background: #f6f7fa;

  .back-button {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.text_soft};
    text-align: center;
    display: block;
    margin-top: 1.2rem;
    transition: 0.2s ease-in-out;

    :hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  .content {
    padding: 2rem 2.5rem;
    background: #fff;
    /* text-align: center; */
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(204, 204, 204, 0.75);

    h2 {
      font-size: 2rem;
      margin-bottom: 0.5rem;
      text-align: center;
    }

    p {
      font-size: 0.9rem;
      color: ${({ theme }) => theme.colors.text_soft};
      text-align: center;
    }
  }
`;

export const ChangePasswordTokenContainer = styled.section`
  height: 100%;

  .content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    min-width: 450px;
  }
`;

export const UserQuestionsContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  margin-top: 2rem;

  .question-item {
    width: 80%;

    margin-bottom: 1rem;

    ::after {
      content: '';
      display: block;
      width: 25%;
      height: 1px;
      background: ${({ theme }) => theme.colors.border};
      margin-top: 1rem;
    }
  }

  h2 {
    font-size: 1.15rem;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 0.25rem;
    opacity: 0.85;
  }
`;

export const AccountFinishedTasksContainer = styled.section`
  h1 {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }

  .admin-view {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid ${({ theme }) => theme.colors.border};

    > h1 {
      margin-bottom: 0.25rem;
    }

    h2 {
      font-size: 1rem;
      margin-bottom: 1rem;
    }

    > p {
      color: ${({ theme }) => theme.colors.text_soft};
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
    }

    .finished-tasks {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }

    li {
      padding: 1rem 4rem 1rem 1rem;
    }
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    list-style: none;

    li {
      position: relative;

      display: flex;
      flex-direction: column;
      justify-content: center;

      border: 1px solid ${({ theme }) => theme.colors.border};

      border-radius: 5px;
      max-width: 350px;

      a {
        padding: 1rem 4rem 1rem 1rem;
      }

      strong {
        display: block;
        font-size: 1rem;
        font-weight: 500;
        margin-bottom: 0.75rem;
      }

      p {
        font-size: 0.85rem;

        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }
`;

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
  max-width: 50%;
  margin: 0 auto;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  padding-bottom: 82px;
`;

const defaultIconStyles = `
  color: white;
  border-radius: 50%;
  padding: 0.4rem;
  margin-bottom: 1rem;
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

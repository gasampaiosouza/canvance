import styled from 'styled-components';

import { Check, Close } from '@styled-icons/material-rounded';
import { darken } from 'polished';

export const Container = styled.section`
  margin-top: 2rem;

  .indicators-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
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

export const ListItemContainer = styled.div`
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

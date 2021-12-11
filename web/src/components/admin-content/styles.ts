import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  gap: 1.5rem;
`;

export const Box = styled.a`
  cursor: pointer;

  background: ${({ theme }) => theme.colors.background};
  box-shadow: 2px 2px 8px rgba(204, 204, 204, 0.5);
  padding: 1rem 1.5rem;
  border-radius: 5px;

  font-size: 0.6rem;
  border: 1px solid ${({ theme }) => theme.colors.border};

  transition: 0.2s ease-in-out;

  :hover {
    color: ${({ theme }) => theme.colors.background};
    background: ${({ theme }) => theme.colors.primary};
  }
`;

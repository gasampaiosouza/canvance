import styled from 'styled-components';

export const Message = styled.span`
  font-weight: 500;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.error};
  user-select: none;
  line-height: 1.5;
`;

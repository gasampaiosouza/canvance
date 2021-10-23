import styled from 'styled-components';

import { transparentize } from 'polished';

interface IFilledBar {
  width?: string;
}

const BarStyles = `
  border-radius: 2.5px;
`;

export const Container = styled.div`
  ${BarStyles}

  margin: 0.5rem auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: 0.2s ease-in-out;

  &:hover {
    filter: brightness(1.025);
  }
`;

export const InnerBar = styled.div`
  // set entire bar height
  height: 30px;

  background: ${({ theme }) => transparentize(0.8, theme.colors.primary)};
`;

export const FilledBar = styled.div<IFilledBar>`
  ${BarStyles}

  width: ${({ width = 0 }) => width};
  height: 100%;
  transition: 0.3s, width 2s;
  transition-delay: width 0.5s;
  background: ${(props) => props.theme.colors.primary};
`;

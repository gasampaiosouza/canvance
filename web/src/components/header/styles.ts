import { KeyboardArrowRight } from '@styled-icons/material-rounded';
import styled from 'styled-components';

import { readableColor, size } from 'polished';

interface IAvatar {
  color?: string;
}

export const Container = styled.header`
  position: sticky;
  top: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.background};
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: space-between;

  grid-area: dashboard_header;

  /* border-bottom: 1px solid ${({ theme }) => theme.colors.border}; */
  padding: 1rem 1.5rem 1.25rem;

  .right-side {
    display: flex;
    align-items: center;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 900;
`;

export const ArrowIcon = styled(KeyboardArrowRight)`
  width: 16px;
  margin: 0.1rem;
`;

export const BreadcrumbContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.7rem;

  a {
    font-size: 0.8rem;
    font-weight: 500;

    &:last-child {
      color: ${({ theme }) => theme.colors.primary};
      font-weight: 600;
    }

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const UserInfo = styled.div<IAvatar>`
  /* defines width & height */
  ${size('45px')}

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 700;

  color: ${({ theme, color = '' }) =>
    readableColor(color, theme.colors.text, '#fff')};
  background: ${({ color = '#e6e6e6' }) => color};
  border-radius: 50%;
`;

export const NotificationsContainer = styled.div`
  cursor: pointer;
  margin-right: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  transition: 0.1s ease-in-out;

  :hover {
    opacity: 0.8;
  }

  svg {
    width: 28px;
  }
`;

import styled from 'styled-components';

const SIDEBAR_WIDTH = '250px';

export const Container = styled.section`
  display: grid;

  grid-template-columns: ${SIDEBAR_WIDTH} 4fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'dashboard_sidebar dashboard_header'
    'dashboard_sidebar dashboard_content'
    'dashboard_sidebar dashboard_content';
`;

export const Content = styled.section`
  overflow-y: auto;
  padding: 1rem 2rem;
  grid-area: dashboard_content;
  background: ${({ theme }) => theme.colors.background};
`;

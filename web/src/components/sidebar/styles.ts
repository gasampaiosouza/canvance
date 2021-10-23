import styled from 'styled-components';

export const Container = styled.aside`
  grid-area: dashboard_sidebar;
  background: ${({ theme }) => theme.colors.primary};

  height: 100vh;
  position: sticky;
  top: 0;

  padding: 2.5rem 0 1rem;
`;

export const SidebarLogo = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.75rem;
  font-weight: 700;
  text-align: center;
`;

export const SidebarItems = styled.div`
  display: flex;
  flex-direction: column;

  color: ${({ theme }) => theme.colors.white};

  margin-top: 3.1rem;

  .sidebar-item {
    position: relative;
    display: flex;
    align-items: center;

    padding: 0.8rem 0.75rem;
    margin-left: 1rem;

    font-size: 0.9rem;
    font-weight: 500;

    transition: 0.2s ease-in-out;

    &.active {
      color: ${({ theme }) => theme.colors.primary};
      background: ${({ theme }) => theme.colors.white};
      border-radius: 8px 0 0 8px;

      ::before,
      ::after {
        content: '';
        position: absolute;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        /* background: red; */
      }

      ::before {
        top: -30px;
        right: 0;
        box-shadow: 15px 15px 0 ${({ theme }) => theme.colors.white};
      }

      ::after {
        bottom: -30px;
        right: 0;
        box-shadow: 15px -15px 0 ${({ theme }) => theme.colors.white};
      }
    }
  }

  svg {
    width: 22px;
    margin-right: 1rem;
  }
`;

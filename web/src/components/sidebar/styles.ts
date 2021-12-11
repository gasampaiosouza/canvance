import { lighten, size } from 'polished';
import styled from 'styled-components';

export const Container = styled.aside`
  position: relative;
  grid-area: dashboard_sidebar;
  background: ${({ theme }) => theme.colors.primary};

  height: 100vh;
  position: sticky;
  top: 0;

  padding: 2.5rem 0 1rem;
`;

export const Logo = styled.div`
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

    :hover,
    :focus {
      background: ${({ theme }) => lighten(0.025, theme.colors.primary)};
    }

    &.active {
      color: ${({ theme }) => theme.colors.primary};
      background: ${({ theme }) => theme.colors.background};
      border-radius: 8px 0 0 8px;

      ::before,
      ::after {
        content: '';
        position: absolute;
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }

      ::before {
        top: -30px;
        right: 0;
        box-shadow: 15px 15px 0 ${({ theme }) => theme.colors.background};
      }

      ::after {
        bottom: -30px;
        right: 0;
        box-shadow: 15px -15px 0 ${({ theme }) => theme.colors.background};
      }
    }
  }

  svg {
    width: 22px;
    margin-right: 1rem;
  }
`;

export const SidebarSubItems = styled.div`
  display: flex;
  flex-direction: column;

  a {
    position: relative;
    transition: 0.2s ease-in-out;

    margin-left: 1rem;
    padding: 0.7rem 0 0.7rem 3rem;
    font-size: 0.825rem;
    font-weight: 300;

    &.active {
      font-weight: 700;

      // ::before {
      //  opacity: 1;
      // }
    }

    //::before {
    //  content: '';

    //  position: absolute;

    //  ${size(6)}

    //  border-radius: 50%;
    //  background: ${({ theme }) => theme.colors.background};
    //  top: 50%;
    //  left: 3rem;
    //  transform: translateY(-50%);
    //  opacity: 0;
    //  transition: 0.2s ease-in-out;
    //}

    :first-child {
      border-radius: 0 15px 0 0;
    }

    :hover,
    :focus {
      background: ${({ theme }) => lighten(0.025, theme.colors.primary)};
    }
  }
`;

export const LogoutContainer = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 50%;
  transform: translateX(50%);

  border: 0;
  background: transparent;

  color: ${({ theme }) => theme.colors.white};
  padding: 1.2rem 1rem 0 1rem;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  ::after {
    content: '';
    position: absolute;
    top: 0;
    width: 75%;
    left: 50%;
    transform: translateX(-50%);
    background: ${({ theme }) => lighten(0.1, theme.colors.primary)};
    height: 1px;
  }

  .user-details {
    width: 100%;

    display: flex;
    align-items: flex-start;
    flex-direction: column;

    font-weight: 500;
    margin-left: 0.5rem;
    font-size: 1rem;

    span {
      cursor: pointer;
      font-size: 0.85rem;
      font-weight: 300;
      margin-top: 0.2rem;
    }
  }

  svg {
    width: 3rem;
  }
`;

import styled from 'styled-components';

export const Container = styled.section`
  height: 100%;

  > h2 {
    text-transform: uppercase;
  }

  .user-inactive {
    position: absolute;
    left: 1rem;
    top: 0.5rem;
    font-weight: 600;
    font-size: 0.75rem;
  }

  .user-permission {
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 0 3px 0 5px;
    font-weight: 700;
    transition: 0.2s ease-in-out;

    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
    padding: 0.5rem;
  }

  .user-name {
    font-size: 1.1rem;
    max-width: 90%;
    line-height: 1.4;
  }

  .user-email {
    margin-top: 0.25rem;
    font-size: 0.75rem;
  }

  .user-bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .user-delete {
      color: ${({ theme }) => theme.colors.error};
      border: 1px solid ${({ theme }) => theme.colors.error};
      padding: 0.25rem;
      border-radius: 50px;
      transition: 0.2s ease-in-out;

      &:hover {
        background: ${({ theme }) => theme.colors.error};
        color: ${({ theme }) => theme.colors.background};
      }

      svg {
        width: 18px;
      }
    }
  }

  .user-category {
    display: block;
    margin-top: 1rem;
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;

    align-self: flex-end;
  }

  .user-relevance {
    filter: brightness(1.15);
  }
`;

// new user
export const NewUserForm = styled.section`
  max-width: 50%;
  margin: 0 auto;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  padding-bottom: 82px;
`;

// edit user
export const EditUserForm = styled(NewUserForm)`
  //...
`;

export const PermissionLevelDescription = styled.div`
  max-width: 50%;
  margin: 0 auto;

  text-align: left;

  > h4 {
    margin-bottom: 1rem;
    font-size: 1rem;
  }

  ul {
    color: ${({ theme }) => theme.colors.text_soft};
    list-style: none;
    font-size: 0.9rem;

    li {
      margin-bottom: 0.75rem;

      strong {
        color: ${({ theme }) => theme.colors.primary};
        font-weight: 500;
      }
    }
  }
`;

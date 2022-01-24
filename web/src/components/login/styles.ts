import { size } from 'polished';
import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 100%;

  /* background: coral; */
  background: #f6f7fa;

  .content {
    padding: 2rem 2.5rem;
    background: #fff;
    /* text-align: center; */
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(204, 204, 204, 0.75);
  }

  .change-password {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.text_soft};
    text-align: center;
    display: block;
    margin-top: 1.2rem;
    transition: 0.2s ease-in-out;

    :hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const Logo = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 1.5rem;

  position: absolute;
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  text-align: center;
`;

export const Description = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text_soft};
  text-align: center;
`;

export const Form = styled.form`
  width: 100%;
  min-width: 450px;
  margin-top: 2.5rem;

  .error-message {
    text-align: left;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
  text-align: left;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;

  margin-top: 1.5rem;
  transition: 0.2s ease-in-out;

  &.has-error {
    border-color: ${({ theme }) => theme.colors.error};
  }

  &.is-valid {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;

    ${size(50)};

    svg {
      color: ${({ theme }) => theme.colors.primary};
      width: 20px;
    }
  }

  label {
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
`;

export const Input = styled.input`
  border-radius: 8px;
  font-size: 0.9rem;
  width: 100%;
  padding: 0.8rem 0 0.8rem 0.25rem;

  border: 0;
  outline: 0;

  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus,
  :-webkit-autofill:active {
    box-shadow: 0 0 0 30px white inset !important;
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.9rem 0;
  background: ${({ theme }) => theme.colors.primary};
  border: 0;
  color: #fff;
  font-weight: 500;
  font-size: 0.9rem;
  border-radius: 8px;
  margin-top: 1rem;
  transition: 0.2s ease-in-out;

  :hover {
    filter: brightness(1.1);
  }
`;

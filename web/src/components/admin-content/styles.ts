import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  gap: 1.5rem;
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .new-button {
    cursor: pointer;

    color: ${({ theme }) => theme.colors.background};
    background: ${({ theme }) => theme.colors.primary};

    border: none;
    border-radius: 5px;

    padding: 0.5rem 1rem;

    font-size: 0.8rem;
    font-weight: 700;

    transition: 0.2s ease-in-out;

    :hover {
      filter: brightness(1.15);
    }
  }
`;

export const BoxesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;

  /* column-count: 4; */
  /* height: 100%; */

  margin-top: 2rem;
`;

type BoxProps = {
  active?: boolean;
};

export const Box = styled.a<BoxProps>`
  position: relative;
  cursor: pointer;

  background: ${({ theme }) => theme.colors.background};
  box-shadow: 2px 2px 5px rgba(204, 204, 204, 0.5);
  padding: 1rem 1rem 1rem;
  padding-top: ${({ active }) => (!active ? '1.75rem' : '1rem')};
  border-radius: 5px;

  text-align: left;

  height: 100%;

  font-size: 0.6rem;
  border: 1px solid ${({ theme }) => theme.colors.border};

  transition: 0.2s ease-in-out;

  display: inline-block;

  /* width: 100%;
  margin-bottom: 20px; */

  display: grid;
  grid-template-rows: 0.5fr 1fr 1fr;

  ${(props) =>
    props.active == false &&
    `
      opacity: 0.7;
      filter: grayscale(1);
    `}

  :hover {
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;

export const PageBottom = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  width: calc(100% - 250px);
  margin-left: auto;

  display: flex;
  justify-content: space-between;

  background: ${({ theme }) => theme.colors.background};
  padding: 1.56rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  > div {
    display: flex;
    gap: 1rem;
  }

  button,
  a {
    cursor: pointer;

    color: ${({ theme }) => theme.colors.background};
    background: ${({ theme }) => theme.colors.primary};

    border: none;
    border-radius: 5px;

    padding: 0.5rem 1rem;

    font-size: 0.8rem;
    font-weight: 700;

    transition: 0.2s ease-in-out;

    :hover {
      filter: brightness(1.15);
    }
  }
`;

export const InputContainer = styled.div<{ label?: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: left;

  > span {
    margin-top: 0.5rem;
  }

  ::before {
    content: ${({ label }) => (label ? `'${label}'` : '')};
    margin-bottom: 0.5rem;
    font-size: 0.85rem;

    color: ${({ theme }) => theme.colors.text_soft};
  }
`;

export const Input = styled.input`
  font-size: 0.9rem;
  width: 100%;
  padding: 0.8rem 1rem;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;

  transition: 0.2s ease-in-out;

  outline: 0;

  -moz-appearance: textfield;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus,
  :-webkit-autofill:active {
    box-shadow: 0 0 0 30px white inset !important;
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }
`;

export const Textarea = styled.textarea`
  font-size: 0.9rem;
  width: 100%;

  padding: 1rem;
  min-height: 10rem;
  min-width: 100%;
  max-width: 100%;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;

  transition: 0.2s ease-in-out;

  outline: 0;

  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus,
  :-webkit-autofill:active {
    box-shadow: 0 0 0 30px white inset !important;
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }
`;

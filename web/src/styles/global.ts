import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const globalStyles = createGlobalStyle`
  :root {
    --toastify-color-light: ${theme.colors.white};

    --toastify-color-info: ${theme.colors.primary};
    --toastify-color-warning: ${theme.colors.warning};
    --toastify-color-error: ${theme.colors.error};
    --toastify-color-success: ${theme.colors.success};

    --toastify-toast-width: 360px;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }

    @media (max-width: 720px) {
      font-size: 87.5%;  
    }
  }

  body,
  input,
  textarea,
  button {
    font: 400 1rem 'Rubik', sans-serif;
  }

  p {
    line-height: 1.4;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  html,
  body,
  #__next {
    height: 100%;
  }

  body {
    color: ${(props) => props.theme.colors.text};
    transition: 0.3s ease-in-out;
  }
`;

export default globalStyles;

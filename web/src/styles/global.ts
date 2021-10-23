import { createGlobalStyle } from 'styled-components';

const globalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;

    &:focus {
      
    }
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
    font: 400 1rem 'Inter', sans-serif;
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

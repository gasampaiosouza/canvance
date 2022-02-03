import { darken, transparentize } from 'polished';
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

  .default-button {
    display: inline-block;
    color: ${({ theme }) => theme.colors.background};
    background: ${({ theme }) => theme.colors.primary};

    border: 0;
    border-radius: 5px;

    font-size: 0.9rem;
    font-weight: 500;

    transition: 0.2s ease-in-out;
    padding: 0.5rem 2rem;

    margin-top: 1.5rem;

    &:hover {
      filter: brightness(1.1);
    }
  }

  // react select
  .category-select__control {
    height: 100% !important;
    min-height: 45px !important;
    text-align: left !important;
    border-color: ${({ theme }) => theme.colors.border} !important;

    :hover {
      border-color: ${({ theme }) => theme.colors.border} !important;
    }
  }

  .category-select__placeholder,
  .category-select__single-value,
  .category-select__option {
    font-size: 0.9rem !important;
  }

  .category-select__value-container {
    padding-left: 16px !important;
  }

  // custom checkbox
.b-contain *,
.b-contain *::before,
.b-contain *::after {
	box-sizing: content-box !important;
}

.b-contain {
  display: table;
	position: relative;
	padding-left: 1.8rem;
	cursor: pointer;
	margin-bottom: .5rem;

  :first-child .b-input::before {
    visibility: hidden;
  }

  :hover input ~ .b-input,
  input:focus ~ .b-input {
    background: rgb(231, 238, 243);
  }

  input {
    position: absolute;
    z-index: -1;
    opacity: 0;

    :focus ~ .b-input {
      box-shadow: 0 0 0 2px ${({ theme }) => transparentize(0.8, theme.colors.text)};

      ::before {
        visibility: visible;
      }
    }

    :checked:focus ~ .b-input,
    :not([disabled]):checked ~ .b-input {
      background: ${({ theme }) => theme.colors.primary};
	    border-color: ${({ theme }) => darken(0.025, theme.colors.primary)};
    }

    :disabled ~ .b-input::after {
      border-color: rgba(135, 149, 161, 1);
    }

    :checked ~ .b-input {
      background: ${({ theme }) => theme.colors.primary};
      border-color: ${({ theme }) => darken(0.05, theme.colors.primary)};

      ::after {
        display: block;
      }
    }


    ~ .b-input {
      position: absolute;
      top: 0;
      left: 0;
      height: 1.25rem;
      width: 1.25rem;
      border: 1px solid rgba(184, 194, 204, 1);
      transition: background 250ms;
      background: rgba(241, 245, 248, 1);

      ::after {
        content: '';
        position: absolute;
        display: none;
        transition: background 250ms;
      }
    }

    &[type="checkbox"] ~ .b-input {
      border-radius: 0.125rem;

      :disabled ~ .b-input {
        background: rgba(241, 245, 248, 1);
        border-color: rgba(184, 194, 204, 1);
        opacity: 0.6;
        cursor: not-allowed;
      }

      ::after {
        left: .45rem;
        top: .18rem;
        width: .25rem;
        height: .6rem;
        border: solid rgba(255, 255, 255, 1);
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }

    &[type="radio"] ~ .b-input {
      border-radius: 2.0rem;

      :disabled ~ .b-input {
        background: rgba(241, 245, 248, 1);
        border-color: rgba(184, 194, 204, 1);
        opacity: 0.6;
        cursor: not-allowed;

        ::after {
          background: rgba(135, 149, 161, 1);
        }
      }

      ::after {
        left: .25rem;
        top: .25rem;
        width: .75rem;
        height: .75rem;
        border-radius: 2.0rem;
        background: rgba(255, 255, 255, 1);
      }

    }
  }

  .b-input::before {
    content: '';
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 3rem;
    height: 3rem;
    margin-left: -0.85rem;
    margin-top: -0.85rem;
    background: rgba(0, 130, 243, 1);
    border-radius: 2rem;
    opacity: .6;
    z-index: 99999;
    transform: scale(0);

    visibility: hidden;
  }

  span {
    line-height: 1.54;
    font-size: 1rem;
    font-family: inherit;
  }
}
`;

export default globalStyles;

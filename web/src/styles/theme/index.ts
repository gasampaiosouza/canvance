import { transparentize } from 'polished';

const appTheme = {
  title: 'light',

  colors: {
    background: '#fff',
    background_secondary: '#f8f8f8',

    white: '#f8f8f8',
    text: '#202C39',
    text_soft: transparentize(0.3, '#202C39'),

    primary: '#6E44FF',

    border: '#e6e6e6',

    success: '#06d6a0',
    error: '#ef476f',
  },
};

export default appTheme;

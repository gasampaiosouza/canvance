import { lighten, transparentize } from 'polished';
import { Theme } from 'react-select';

const appTheme = {
  title: 'light',

  select_default: function (theme: Theme) {
    return {
      ...theme,
      borderRadius: 8,
      colors: {
        ...theme.colors,
        text: appTheme.colors.text,
        primary25: lighten(0.325, appTheme.colors.primary),
        primary: appTheme.colors.primary,
      },
    };
  },

  colors: {
    background: '#fff',
    background_secondary: '#f8f8f8',

    white: '#f8f8f8',
    text: '#202C39',
    text_soft: transparentize(0.3, '#202C39'),

    primary: '#6E44FF',

    border: '#e6e6e6',

    success: '#06d6a0',
    warning: '#f39c12',
    error: '#ef476f',
  },

  media: {
    mobile: 767,
    tablet: 1024,
  },
};

export default appTheme;

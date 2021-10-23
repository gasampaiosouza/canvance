import { AuthProvider } from 'contexts/AuthContext';
import { AppProps } from 'next/dist/shared/lib/router/router';
import { default as Loading } from 'nextjs-progressbar';
import { ThemeProvider as Theme } from 'styled-components';
import appTheme from 'styles/theme';
import { TasksProvider } from '../contexts/TasksContext';
import GlobalStyle from '../styles/global';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <TasksProvider>
        <Theme theme={appTheme}>
          <Component {...pageProps} />
          <GlobalStyle />

          <Loading height={3} color={appTheme.colors.primary} />
        </Theme>
      </TasksProvider>
    </AuthProvider>
  );
};

export default App;

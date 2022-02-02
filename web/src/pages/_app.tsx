import { AuthProvider } from 'contexts/AuthContext';
import { AppProps } from 'next/dist/shared/lib/router/router';
import { default as Loading } from 'nextjs-progressbar';
import { ThemeProvider as Theme } from 'styled-components';
import appTheme from 'styles/theme';
import GlobalStyle from '../styles/global';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TasksProvider } from 'contexts/TaskContext';
import { UsersProvider } from 'contexts/UserContext';
import { CategoriesProvider } from 'contexts/CategoryContext';
import ReactModal from 'react-modal';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <UsersProvider>
        <CategoriesProvider>
          <TasksProvider>
            <Theme theme={appTheme}>
              <Component {...pageProps} />
              <GlobalStyle />

              <ToastContainer position="top-right" autoClose={4500} />

              <Loading
                height={3}
                color={appTheme.colors.primary}
                options={{ showSpinner: false }}
              />
            </Theme>
          </TasksProvider>
        </CategoriesProvider>
      </UsersProvider>
    </AuthProvider>
  );
};

ReactModal.setAppElement('#__next');

export default App;

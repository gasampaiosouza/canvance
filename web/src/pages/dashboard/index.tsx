import { ITask } from '@/interfaces';

import Header from 'components/header';
import ProgressBar from 'components/progress-bar';
import Sidebar from 'components/sidebar';
import UserTasks from 'components/user-tasks';

import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { parseCookies } from 'nookies';

import api from 'services/api';

import { Container, Content } from 'styles/dashboard-styles';

// import { useAuth } from 'hooks/useAuth';

interface HomeProps {
  tasks: ITask[];
}

const App: React.FC<HomeProps> = () => {
  // const { user } = useAuth();

  const breadcrumb = [{ label: 'Meu progresso', href: '/' }];

  return (
    <>
      <Head>
        <title>Canvance - Dashboard</title>
      </Head>

      <Container>
        <Header title="Meu progresso" breadcrumb={breadcrumb} />

        <Content>
          <ProgressBar />
          <UserTasks />
        </Content>

        <Sidebar />
      </Container>
    </>
  );
};

export default App;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'canvance.token': token } = parseCookies(ctx);

  if (!token) return { redirect: { destination: '/login', permanent: false } };

  api.defaults.headers['Authorization'] = `Bearer ${token}`;

  return { props: {} };
};

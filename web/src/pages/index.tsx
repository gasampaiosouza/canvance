import { Container, Content } from 'styles/dashboard-styles';

import Header from 'components/header';
import ProgressBar from 'components/progress-bar';
import UserTasks from 'components/user-tasks';
import Sidebar from 'components/sidebar';
import { ITasks, IUser } from '@/interfaces';
import api from 'services/api';

import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

interface HomeProps {
  tasks: ITasks[];
}

const App: React.FC<HomeProps> = ({ tasks }) => {
  const breadcrumb = [
    { label: 'Login', href: '/login' },
    { label: 'Meu progresso', href: '/' },
  ];

  return (
    <>
      <Head>
        <title>Canvance - Dashboard</title>
      </Head>

      <Container>
        <Header title="Meu progresso" breadcrumb={breadcrumb} />

        <Content>
          <ProgressBar />

          <UserTasks preFetchedTasks={tasks} />
        </Content>

        <Sidebar />
      </Container>
    </>
  );
};

export default App;

// get initial tasks
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'canvance.token': token } = parseCookies(ctx);

  if (!token) return { redirect: { destination: '/login', permanent: false } };

  api.defaults.headers['Authorization'] = `Bearer ${token}`;

  try {
    const { data: user } = await api.get<IUser>(`/user/profile`);

    const { data: tasks } = await api.get<ITasks[]>(
      `/tasks/category/${user?.category._id}`
    );

    return { props: { tasks } };
  } catch (error: any) {
    return { redirect: { statusCode: 303, destination: '/login' } };
  }
};

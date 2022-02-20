import FinishedTasksContent from 'components/account/finished-tasks_content';
import Header from 'components/header';
import Sidebar from 'components/sidebar';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import api from 'services/api';
import { Container, Content } from 'styles/dashboard-styles';

const FinishedTasks = () => {
  const breadcrumb = [
    { label: 'Minha conta', href: '/account' },
    { label: 'Tarefas finalizadas', href: '/account/finished-tasks' },
  ];

  return (
    <>
      <Head>
        <title>Canvance - Tarefas finalizadas</title>
      </Head>

      <Container>
        <Header title="Tarefas finalizadas" breadcrumb={breadcrumb} />

        <Content>
          <FinishedTasksContent />
        </Content>

        <Sidebar />
      </Container>
    </>
  );
};

export default FinishedTasks;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'canvance.token': token } = parseCookies(ctx);

  if (!token) return { redirect: { destination: '/login', permanent: false } };

  api.defaults.headers['Authorization'] = `Bearer ${token}`;

  return { props: {} };
};

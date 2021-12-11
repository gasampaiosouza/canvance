import Head from 'next/head';

import Header from 'components/header';
import Sidebar from 'components/sidebar';

import { Container, Content } from 'styles/dashboard-styles';

import { GetServerSideProps } from 'next';
import { handleAdminAuthentication } from 'helpers/admin-auth';
import ManageTasksContent from 'components/admin-content/tasks-content';

const ManageTasks = () => {
  const breadcrumb = [
    { label: 'Painel de administração', href: '/admin' },
    { label: 'Gerenciar tarefas', href: '/admin/tasks' },
  ];

  return (
    <>
      <Head>
        <title>Canvance - Gerenciar tarefas</title>
      </Head>

      <Container>
        <Header title="Gerenciar tarefas" breadcrumb={breadcrumb} />

        <Content>
          <ManageTasksContent />
        </Content>

        <Sidebar />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await handleAdminAuthentication(ctx);
};

export default ManageTasks;

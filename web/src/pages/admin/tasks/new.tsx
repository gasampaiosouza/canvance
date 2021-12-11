import Head from 'next/head';

import Header from 'components/header';
import Sidebar from 'components/sidebar';

import { Container, Content } from 'styles/dashboard-styles';

import { GetServerSideProps } from 'next';
import { handleAdminAuthentication } from 'helpers/admin-auth';
import ManageNewTask from 'components/admin-content/tasks-content/new-task';

const CreateNewTask = () => {
  const breadcrumb = [
    { label: 'Painel de administração', href: '/admin' },
    { label: 'Gerenciar tarefas', href: '/admin/tasks' },
    { label: 'Nova tarefa', href: '/admin/tasks/new' },
  ];

  return (
    <>
      <Head>
        <title>Canvance - Criar nova tarefa</title>
      </Head>

      <Container>
        <Header title="Criar nova tarefa" breadcrumb={breadcrumb} />

        <Content>
          <ManageNewTask />
        </Content>

        <Sidebar />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await handleAdminAuthentication(ctx);
};

export default CreateNewTask;

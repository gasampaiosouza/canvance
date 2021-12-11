import Head from 'next/head';

import Header from 'components/header';
import Sidebar from 'components/sidebar';

import { Container, Content } from 'styles/dashboard-styles';

import { GetServerSideProps } from 'next';
import { handleAdminAuthentication } from 'helpers/admin-auth';
import { useRouter } from 'next/router';

import ManageEditTask from 'components/admin-content/tasks-content/edit-task';

const CreateNewTask = () => {
  const router = useRouter();
  const { task_id } = router.query;

  const breadcrumb = [
    { label: 'Painel de administração', href: '/admin' },
    { label: 'Gerenciar tarefas', href: '/admin/tasks' },
    { label: 'Editar tarefa', href: `/admin/tasks/edit/${task_id}` },
  ];

  return (
    <>
      <Head>
        <title>Canvance - Editar tarefa</title>
      </Head>

      <Container>
        <Header title="Editar tarefa" breadcrumb={breadcrumb} />

        <Content>
          <ManageEditTask taskId={task_id as string} />
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

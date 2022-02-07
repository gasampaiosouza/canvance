import Head from 'next/head';

import Header from 'components/header';
import Sidebar from 'components/sidebar';

import { Container, Content } from 'styles/dashboard-styles';

import { GetServerSideProps } from 'next';
import { handleAdminAuthentication } from 'helpers/admin-auth';
import ManageQuestionsContent from 'components/admin-content/questions-content';

const ManageQuestions = () => {
  const breadcrumb = [
    { label: 'Painel de administração', href: '/admin' },
    { label: 'Gerenciar perguntas', href: '/admin/questions' },
  ];

  return (
    <>
      <Head>
        <title>Canvance - Gerenciar perguntas</title>
      </Head>

      <Container>
        <Header title="Gerenciar perguntas" breadcrumb={breadcrumb} />

        <Content>
          <ManageQuestionsContent />
        </Content>

        <Sidebar />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await handleAdminAuthentication(ctx);
};

export default ManageQuestions;

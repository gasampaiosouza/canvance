import Head from 'next/head';

import Header from 'components/header';
import Sidebar from 'components/sidebar';

import { Container, Content } from 'styles/dashboard-styles';

import { GetServerSideProps } from 'next';
import { handleAdminAuthentication } from 'helpers/admin-auth';
import { useRouter } from 'next/router';

import ManageEditQuestion from 'components/admin-content/questions-content/edit-question';

const EditTask = () => {
  const router = useRouter();
  const { question_id } = router.query;

  const breadcrumb = [
    { label: 'Painel de administração', href: '/admin' },
    { label: 'Gerenciar perguntas', href: '/admin/questions' },
    { label: 'Editar pergunta', href: `/admin/questions/edit/${question_id}` },
  ];

  return (
    <>
      <Head>
        <title>Canvance - Editar pergunta</title>
      </Head>

      <Container>
        <Header title="Editar pergunta" breadcrumb={breadcrumb} />

        <Content>
          <ManageEditQuestion questionId={question_id as string} />
        </Content>

        <Sidebar />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await handleAdminAuthentication(ctx);
};

export default EditTask;

import Head from 'next/head';

import Header from 'components/header';
import Sidebar from 'components/sidebar';

import { Container, Content } from 'styles/dashboard-styles';

import { GetServerSideProps } from 'next';
import { handleAdminAuthentication } from 'helpers/admin-auth';
import ManageNewUser from 'components/admin-content/users-content/new-user';

const CreateNewUser = () => {
  const breadcrumb = [
    { label: 'Painel de administração', href: '/admin' },
    { label: 'Gerenciar usuários', href: '/admin/users' },
    { label: 'Novo usuário', href: '/admin/users/new' },
  ];

  return (
    <>
      <Head>
        <title>Canvance - Criar novo usuário</title>
      </Head>

      <Container>
        <Header title="Criar novo usuário" breadcrumb={breadcrumb} />

        <Content>
          <ManageNewUser />
        </Content>

        <Sidebar />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await handleAdminAuthentication(ctx);
};

export default CreateNewUser;

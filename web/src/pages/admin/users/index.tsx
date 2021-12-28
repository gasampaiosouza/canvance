import Head from 'next/head';

import Header from 'components/header';
import Sidebar from 'components/sidebar';

import { Container, Content } from 'styles/dashboard-styles';

import { GetServerSideProps } from 'next';
import { handleAdminAuthentication } from 'helpers/admin-auth';
import ManageUsersContent from 'components/admin-content/users-content';

const ManageUsers = () => {
  const breadcrumb = [
    { label: 'Painel de administração', href: '/admin' },
    { label: 'Gerenciar usuários', href: '/admin/users' },
  ];

  return (
    <>
      <Head>
        <title>Canvance - Gerenciar usuários</title>
      </Head>

      <Container>
        <Header title="Gerenciar usuários" breadcrumb={breadcrumb} />

        <Content>
          <ManageUsersContent />
        </Content>

        <Sidebar />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await handleAdminAuthentication(ctx);
};

export default ManageUsers;

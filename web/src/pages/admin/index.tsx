import Head from 'next/head';

import Header from 'components/header';
import Sidebar from 'components/sidebar';

import { Container, Content } from 'styles/dashboard-styles';
import AdminContent from 'components/admin-content';

import { GetServerSideProps } from 'next';
import { handleAdminAuthentication } from 'helpers/admin-auth';

const AdminPanel = () => {
  const breadcrumb = [
    { label: 'Meu progresso', href: '/' },
    { label: 'Painel de administração', href: '/admin' },
  ];

  return (
    <>
      <Head>
        <title>Canvance - Painel de administração</title>
      </Head>

      <Container>
        <Header title="Painel de administração" breadcrumb={breadcrumb} />

        <Content>
          <AdminContent />
        </Content>

        <Sidebar />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await handleAdminAuthentication(ctx);
};

export default AdminPanel;

import Head from 'next/head';

import Header from 'components/header';
import Sidebar from 'components/sidebar';

import { Container, Content } from 'styles/dashboard-styles';

import { GetServerSideProps } from 'next';
import { handleAdminAuthentication } from 'helpers/admin-auth';
import ManageCategoriesContent from 'components/admin-content/categories-content';

const ManageCategories = () => {
  const breadcrumb = [
    { label: 'Painel de administração', href: '/admin' },
    { label: 'Gerenciar categorias', href: '/admin/categories' },
  ];

  return (
    <>
      <Head>
        <title>Canvance - Gerenciar categorias</title>
      </Head>

      <Container>
        <Header title="Gerenciar categorias" breadcrumb={breadcrumb} />

        <Content>
          <ManageCategoriesContent />
        </Content>

        <Sidebar />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await handleAdminAuthentication(ctx);
};

export default ManageCategories;

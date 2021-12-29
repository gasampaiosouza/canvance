import Head from 'next/head';

import Header from 'components/header';
import Sidebar from 'components/sidebar';

import { Container, Content } from 'styles/dashboard-styles';

import { GetServerSideProps } from 'next';
import { handleAdminAuthentication } from 'helpers/admin-auth';
import ManageNewCategory from 'components/admin-content/categories-content/new-category';

const CreateNewCategory = () => {
  const breadcrumb = [
    { label: 'Painel de administração', href: '/admin' },
    { label: 'Gerenciar categorias', href: '/admin/categories' },
    { label: 'Nova categoria', href: '/admin/categories/new' },
  ];

  return (
    <>
      <Head>
        <title>Canvance - Criar nova categoria</title>
      </Head>

      <Container>
        <Header title="Criar nova categoria" breadcrumb={breadcrumb} />

        <Content>
          <ManageNewCategory />
        </Content>

        <Sidebar />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await handleAdminAuthentication(ctx);
};

export default CreateNewCategory;

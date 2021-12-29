import Head from 'next/head';

import Header from 'components/header';
import Sidebar from 'components/sidebar';

import { Container, Content } from 'styles/dashboard-styles';

import { GetServerSideProps } from 'next';
import { handleAdminAuthentication } from 'helpers/admin-auth';
import { useRouter } from 'next/router';

import ManageEditCategory from 'components/admin-content/categories-content/edit-category';

const EditCategory = () => {
  const router = useRouter();
  const { category_id } = router.query;

  const breadcrumb = [
    { label: 'Painel de administração', href: '/admin' },
    { label: 'Gerenciar categorias', href: '/admin/categories' },
    { label: 'Editar categoria', href: `/admin/categories/edit/${category_id}` },
  ];

  return (
    <>
      <Head>
        <title>Canvance - Editar Usuário</title>
      </Head>

      <Container>
        <Header title="Editar categoria" breadcrumb={breadcrumb} />

        <Content>
          <ManageEditCategory category_id={category_id as string} />
        </Content>

        <Sidebar />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await handleAdminAuthentication(ctx);
};

export default EditCategory;

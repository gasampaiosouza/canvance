import Head from 'next/head';

import Header from 'components/header';
import Sidebar from 'components/sidebar';

import { Container, Content } from 'styles/dashboard-styles';

import { GetServerSideProps } from 'next';
import { handleAdminAuthentication } from 'helpers/admin-auth';
import { useRouter } from 'next/router';

import ManageEditUser from 'components/admin-content/users-content/edit-user';

const EditUser = () => {
  const router = useRouter();
  const { user_id } = router.query;

  const breadcrumb = [
    { label: 'Painel de administração', href: '/admin' },
    { label: 'Gerenciar usuários', href: '/admin/users' },
    { label: 'Editar usuário', href: `/admin/users/edit/${user_id}` },
  ];

  return (
    <>
      <Head>
        <title>Canvance - Editar usuário</title>
      </Head>

      <Container>
        <Header title="Editar usuário" breadcrumb={breadcrumb} />

        <Content>
          <ManageEditUser userId={user_id as string} />
        </Content>

        <Sidebar />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await handleAdminAuthentication(ctx);
};

export default EditUser;

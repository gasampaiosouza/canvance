import AccountContent from 'components/account';
import Header from 'components/header';
import Sidebar from 'components/sidebar';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import api from 'services/api';
import { Container, Content } from 'styles/dashboard-styles';

const AccountPage = () => {
  const breadcrumb = [{ label: 'Minha conta', href: '/account' }];

  return (
    <>
      <Head>
        <title>Canvance - Minha conta</title>
      </Head>

      <Container>
        <Header title="Minha conta" breadcrumb={breadcrumb} />

        <Content>
          <AccountContent />
        </Content>

        <Sidebar />
      </Container>
    </>
  );
};

export default AccountPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'canvance.token': token } = parseCookies(ctx);

  if (!token) return { redirect: { destination: '/login', permanent: false } };

  api.defaults.headers['Authorization'] = `Bearer ${token}`;

  return { props: {} };
};

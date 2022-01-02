import AccountContent from 'components/account';
import Header from 'components/header';
import Sidebar from 'components/sidebar';
import Head from 'next/head';
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

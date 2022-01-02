import ChangePasswordTokenContent from 'components/account/change-password_token';
import Header from 'components/header';
import Sidebar from 'components/sidebar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Container, Content } from 'styles/dashboard-styles';

const ChangePasswordTokenPage = () => {
  const { asPath, query } = useRouter();

  const breadcrumb = [
    { label: 'Minha conta', href: '/account' },
    { label: 'Alterar minha senha', href: asPath },
  ];

  return (
    <>
      <Head>
        <title>Canvance - Alterar minha senha</title>
      </Head>

      <Container>
        <Header title="Alterar minha senha" breadcrumb={breadcrumb} />

        <Content>
          <ChangePasswordTokenContent token={query.token as string} />
        </Content>

        <Sidebar />
      </Container>
    </>
  );
};

export default ChangePasswordTokenPage;

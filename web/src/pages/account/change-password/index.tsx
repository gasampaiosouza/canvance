import { sendPasswordMail } from '@/modules/send-password-email';
import ChangePasswordContent from 'components/account/change-password';
import Header from 'components/header';
import Sidebar from 'components/sidebar';
import { useAuth } from 'hooks/useAuth';
import Head from 'next/head';
import React from 'react';
import { Container, Content } from 'styles/dashboard-styles';

export interface MailProps {
  success: boolean;
  message: string;
}

const ChangePasswordPage = () => {
  const [pageContentStatus, setPageContentStatus] = React.useState<Omit<
    MailProps,
    'message'
  > | null>(null);

  const { user } = useAuth();

  React.useEffect(() => {
    async function handlePasswordMail() {
      const response = await sendPasswordMail(user?.email || '');

      if (!response.success) {
        setPageContentStatus({ success: false });
        return;
      }

      setPageContentStatus({ success: true });
    }

    handlePasswordMail();
  }, [user]);
  const breadcrumb = [
    { label: 'Minha conta', href: '/account' },
    { label: 'Alterar minha senha', href: '/account/change-password' },
  ];

  return (
    <>
      <Head>
        <title>Canvance - Alterar minha senha</title>
      </Head>

      <Container>
        <Header title="Alterar minha senha" breadcrumb={breadcrumb} />

        <Content>
          {pageContentStatus ? (
            <ChangePasswordContent
              success={pageContentStatus.success}
              email={user?.email || ''}
            />
          ) : (
            <h3>Enviando email...</h3>
          )}
        </Content>

        <Sidebar />
      </Container>
    </>
  );
};

export default ChangePasswordPage;

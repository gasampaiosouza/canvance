import { useState, useEffect } from 'react';

import { MailProps, sendPasswordMail } from '@/modules/send-password-email';
import ChangePasswordContent from 'components/account/change-password/change-password_content';

import Head from 'next/head';
import { useRouter } from 'next/router';
import InputEmailToChangePassword from 'components/account/change-password/input-email';
import { ChangePasswordContainer } from 'components/account/styles';

// path -> /account/change-password?userEmail=<email>
// query is NOT required

type PageStatusType = Omit<MailProps, 'message'> | null;

const ChangePasswordPage = () => {
  const [pageContentStatus, setPageContentStatus] = useState<PageStatusType>(null);

  const { query } = useRouter();

  // useEffect(() => {
  //   async function handlePasswordMail() {
  //     const email = query.userEmail;
  //     const response = await sendPasswordMail(email);

  //     if (!response.success) {
  //       setPageContentStatus({ success: false });
  //       return;
  //     }

  //     setPageContentStatus({ success: true });
  //   }

  //   handlePasswordMail();
  // }, []);

  return (
    <>
      <Head>
        <title>Canvance - Alterar minha senha</title>
      </Head>

      <ChangePasswordContainer>
        <InputEmailToChangePassword />

        {/* <Content>
            {pageContentStatus ? (
              <ChangePasswordContent success={pageContentStatus.success} email={email} />
            ) : (
              <h3>Enviando email...</h3>
            )}
          </Content> */}
      </ChangePasswordContainer>
    </>
  );
};

export default ChangePasswordPage;

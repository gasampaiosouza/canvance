import Head from 'next/head';
import { useRouter } from 'next/router';
import InputEmailToChangePassword from 'components/account/change-password/input-email';
import { ChangePasswordContainer } from 'components/account/styles';

// path -> /account/change-password?userEmail=<email>
// query is NOT required

const ChangePasswordPage = () => {
  const { query } = useRouter();

  return (
    <>
      <Head>
        <title>Canvance - Alterar minha senha</title>
      </Head>

      <ChangePasswordContainer>
        <InputEmailToChangePassword defaultEmail={(query.userEmail as string) || ''} />
      </ChangePasswordContainer>
    </>
  );
};

export default ChangePasswordPage;

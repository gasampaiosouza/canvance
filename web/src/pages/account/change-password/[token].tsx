import ChangePasswordTokenContent from 'components/account/change-password/change-password_token';
import { ChangePasswordTokenContainer } from 'components/account/styles';
import Head from 'next/head';
import { useRouter } from 'next/router';

const ChangePasswordTokenPage = () => {
  const { query } = useRouter();

  return (
    <>
      <Head>
        <title>Canvance - Alterar minha senha</title>
      </Head>

      <ChangePasswordTokenContainer>
        <ChangePasswordTokenContent token={query.token as string} />
      </ChangePasswordTokenContainer>
    </>
  );
};

export default ChangePasswordTokenPage;

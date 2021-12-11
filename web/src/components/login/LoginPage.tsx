import Link from 'next/link';
import Head from 'next/head';

import { Container, Logo, Title, Description } from './styles';
import { LoginForm } from './LoginForm';

export const LoginPage: React.FC = () => {
  return (
    <Container>
      <Head>
        <title>Canvance | Login</title>
      </Head>
      <Link href="/dashboard">
        <a>
          <Logo color="primary">Canvance</Logo>
        </a>
      </Link>
      <div className="content">
        <Title>Bem vindo de volta</Title>

        <Description>Digite seus dados de login para acessar sua conta</Description>

        <LoginForm />
      </div>
    </Container>
  );
};

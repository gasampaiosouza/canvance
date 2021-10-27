import Link from 'next/link';
import Head from 'next/head';

import { Container, Logo, Title, Description, RegisterLabel } from './styles';
import { LoginForm } from './LoginForm';

export const LoginPage: React.FC = () => {
  return (
    <Container>
      <Head>
        <title>Canvance | Login</title>
      </Head>
      <Link href="/">
        <a>
          <Logo color="primary">Canvance</Logo>
        </a>
      </Link>
      <div className="content">
        <Title>Bem vindo de volta</Title>

        <Description>Digite seus dados de login para acessar sua conta</Description>

        <LoginForm />
      </div>

      <RegisterLabel>
        Ainda não tem uma conta?{' '}
        <Link href="/register">
          <a>Solicite uma</a>
        </Link>
        .
      </RegisterLabel>
    </Container>
  );
};

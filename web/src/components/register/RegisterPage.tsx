import Link from 'next/link';
import Head from 'next/head';

import { Container, Logo, Title, Description, RegisterLabel } from './styles';
import { RegisterForm } from './RegisterForm';

export const RegisterPage: React.FC = () => {
  return (
    <Container>
      <Head>
        <title>Canvance | Registro de usuário</title>
      </Head>
      <Link href="/">
        <a>
          <Logo color="primary">Canvance</Logo>
        </a>
      </Link>
      <div className="content">
        <Title>Solicite uma conta</Title>
        <Description>Digite seus dados para criar uma conta</Description>
        <RegisterForm />
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

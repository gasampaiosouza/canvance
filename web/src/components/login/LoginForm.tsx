import { Email, Lock } from '@styled-icons/material-rounded';

import { useAuth } from 'hooks/useAuth';
import { useRef, useState } from 'react';
import { Form, Input, InputContainer, SubmitButton } from './styles';

import { toast } from 'react-toastify';

import Link from 'next/link';

export const LoginForm: React.FC = () => {
  const { signIn } = useAuth();
  const [submitText, setSubmitText] = useState('Fazer login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();

    setSubmitText('Autenticando...');

    const data = { email, password };

    try {
      // @ts-ignore
      const { error } = await signIn(data);

      // everything ok
      if (!error) {
        return setSubmitText('Tudo certo!');
      }

      // an error occurred
      const errorMessage = 'Email ou senha incorretos';
      toast.error(errorMessage);
    } catch (error) {
      toast.error('Ocorreu um erro ao tentar fazer login');
    }

    setSubmitText('Fazer login');
  }

  return (
    <Form onSubmit={(event) => handleSignIn(event)}>
      <InputContainer>
        <div className="icon">
          <Email />
        </div>

        <Input
          type="email"
          placeholder="Digite seu email"
          onBlur={(ev) => setEmail(ev.target.value)}
        />
      </InputContainer>

      <InputContainer>
        <div className="icon">
          <Lock />
        </div>

        <Input
          type="password"
          placeholder="Digite sua senha"
          onBlur={(ev) => setPassword(ev.target.value)}
        />
      </InputContainer>

      <SubmitButton>{submitText}</SubmitButton>

      <Link
        href={`/account/change-password?userEmail=${email}`}
        as="/account/change-password"
      >
        <a className="change-password">Esqueceu sua senha?</a>
      </Link>
    </Form>
  );
};

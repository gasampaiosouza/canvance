import { Email, Lock } from '@styled-icons/material-rounded';

import { useAuth } from 'hooks/useAuth';
import { useState } from 'react';
import { Form, Input, InputContainer, SubmitButton } from './styles';

import { toast } from 'react-toastify';

import Link from 'next/link';
import { useUserList } from 'hooks/useUserList';
import InactiveUserModal from './InactiveUserModal';
import { IUser } from '@/interfaces';

export const LoginForm: React.FC = () => {
  const { allUsers } = useUserList();

  const { signIn } = useAuth();
  const [submitText, setSubmitText] = useState('Fazer login');

  const [isInactive, setIsInactive] = useState({
    isOpen: false,
    user: {} as IUser,
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();

    setSubmitText('Autenticando...');

    try {
      const user = allUsers.find((user) => user.email === email);

      if (!user?.active) {
        setSubmitText('Fazer login');
        setIsInactive({ isOpen: true, user: user as IUser });

        return;
      }

      const data = { email, password };

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

  const closeInactiveModal = () => setIsInactive({ isOpen: false, user: {} as IUser });

  return (
    <>
      <Form onSubmit={(event) => handleSignIn(event)}>
        <InputContainer>
          <div className="icon">
            <Email />
          </div>

          <Input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
        </InputContainer>

        <InputContainer>
          <div className="icon">
            <Lock />
          </div>

          <Input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
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

      <InactiveUserModal
        isOpen={isInactive.isOpen}
        onClose={closeInactiveModal}
        user={isInactive.user}
      />
    </>
  );
};

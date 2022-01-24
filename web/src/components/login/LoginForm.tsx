import { Email, Lock } from '@styled-icons/material-rounded';
import { ErrorMessage } from 'components/error-message';
import { patterns } from 'helpers/patterns';
import { useAuth } from 'hooks/useAuth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Input, InputContainer, SubmitButton } from './styles';

import { toast } from 'react-toastify';
import { handleClassValidation } from 'helpers/handle-form_class';

import Link from 'next/link';

interface SubmitProps {
  email: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const { signIn } = useAuth();
  const [submitText, setSubmitText] = useState('Fazer login');
  const { register, handleSubmit, formState, setError } = useForm<SubmitProps>();

  const { errors } = formState;

  async function handleSignIn(data: SubmitProps) {
    setSubmitText('Autenticando...');

    try {
      // @ts-ignore
      const { error } = await signIn(data);

      // everything ok
      if (!error) {
        return setSubmitText('Tudo certo!');
      }

      // and error occurred
      const { error_message, type } = error.response.data;

      if (type == 'email') {
        setError('email', { type: 'value', message: error_message });
      }

      if (type == 'password') {
        setError('password', { type: 'value', message: error_message });
      }
    } catch (error) {
      toast.error('Ocorreu um erro ao tentar fazer login');
    }

    setSubmitText('Fazer login');
  }

  const REmailOptions = {
    required: 'O email é obrigatório.',
    pattern: { value: patterns.email, message: 'Insira um email válido.' },
  };

  const RPasswordOptions = {
    required: 'A senha é obrigatória.',
    minLength: { value: 5, message: 'A senha deve conter mais de 5 caracteres' },
  };

  return (
    <Form onSubmit={handleSubmit(handleSignIn)}>
      <InputContainer className={handleClassValidation(errors?.email)}>
        <div className="icon">
          <Email />
        </div>

        <Input
          type="email"
          placeholder="Digite seu email"
          {...register('email', REmailOptions)}
        />
      </InputContainer>
      {errors?.email && <ErrorMessage message={errors.email.message || ''} />}

      <InputContainer className={handleClassValidation(errors?.password)}>
        <div className="icon">
          <Lock />
        </div>

        <Input
          type="password"
          placeholder="Digite sua senha"
          {...register('password', RPasswordOptions)}
        />
      </InputContainer>
      {errors?.password && <ErrorMessage message={errors.password.message || ''} />}

      <SubmitButton>{submitText}</SubmitButton>

      <Link href="/account/change-password">
        <a className="change-password">Esqueceu sua senha?</a>
      </Link>
    </Form>
  );
};

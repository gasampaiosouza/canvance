import { Email, Lock } from '@styled-icons/material-rounded';
import { ErrorMessage } from 'components/error-message';
import { patterns } from 'helpers/patterns';
import { useAuth } from 'hooks/useAuth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Input, InputContainer, SubmitButton } from './styles';

interface SubmitProps {
  email: string;
  username: string;
}

/*
  [] - nome
  [] - email
*/

export const RegisterForm: React.FC = () => {
  const { signIn } = useAuth();
  const [submitText, setSubmitText] = useState('Fazer login');
  const { register, handleSubmit, formState, setError } = useForm<SubmitProps>({
    // reValidateMode: 'onBlur',
  });

  const { errors, dirtyFields } = formState;

  async function handleSignIn(data: SubmitProps) {
    setSubmitText('Autenticando...');

    // @ts-ignore
    const { error } = await signIn(data);

    if (!error) {
      setSubmitText('Tudo certo!');
      return;
    }

    const { error_message, type } = error.response.data;

    if (type == 'email') {
      setError('email', { type: 'value', message: error_message });
    }

    if (type == 'password') {
      setError('username', { type: 'value', message: error_message });
    }

    setSubmitText('Fazer login');
  }

  const REmailOptions = {
    required: 'O email é obrigatório.',
    pattern: { value: patterns.email, message: 'Insira um email válido.' },
  };

  const RUsernameOptions = {
    required: 'O nome completo é obrigatório.',
    minLength: { value: 4, message: 'O nome deve ser completo.' },
  };

  const handleClassValidation = (validation: unknown) => {
    const hasChangedFields = Object.keys(dirtyFields).length;

    return validation ? 'has-error' : hasChangedFields ? 'is-valid' : '';
  };

  return (
    <Form onSubmit={handleSubmit(handleSignIn)}>
      <InputContainer className={handleClassValidation(errors?.email)}>
        <div className="icon">
          <Email />
        </div>

        <Input
          placeholder="Digite seu nome completo"
          {...register('username', REmailOptions)}
        />
      </InputContainer>
      {errors?.email && <ErrorMessage message={errors.email.message || ''} />}

      <InputContainer className={handleClassValidation(errors?.username)}>
        <div className="icon">
          <Lock />
        </div>

        <Input
          type="password"
          placeholder="Digite sua senha"
          {...register('username', RUsernameOptions)}
        />
      </InputContainer>
      {errors?.username && <ErrorMessage message={errors.username.message || ''} />}

      <SubmitButton>{submitText}</SubmitButton>
    </Form>
  );
};

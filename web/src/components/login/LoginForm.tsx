import { Email, Lock } from '@styled-icons/material-rounded';
import { ErrorMessage } from 'components/error-message';
import { patterns } from 'helpers/patterns';
import { useAuth } from 'hooks/useAuth';
import { useForm } from 'react-hook-form';
import { Form, Input, InputContainer, SubmitButton } from './styles';

interface SubmitProps {
  email: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const { signIn } = useAuth();
  const { register, handleSubmit, formState, setError } = useForm<SubmitProps>({
    // reValidateMode: 'onBlur',
  });

  const { errors, dirtyFields } = formState;

  async function handleSignIn(data: SubmitProps) {
    // @ts-ignore
    const { error } = await signIn(data);

    if (!error) return;

    const { error_message, type } = error.response.data;

    if (type == 'email') {
      return setError('email', { type: 'value', message: error_message });
    }

    if (type == 'password') {
      return setError('password', { type: 'value', message: error_message });
    }
  }

  const REmailOptions = {
    required: 'O email é obrigatório.',
    pattern: { value: patterns.email, message: 'Insira um email válido.' },
  };

  const RPasswordOptions = {
    required: 'A senha é obrigatória.',
    minLength: { value: 8, message: 'A senha deve conter mais de 8 caracteres' },
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

      <SubmitButton>Fazer login</SubmitButton>
    </Form>
  );
};

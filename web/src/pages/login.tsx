import { AuthContext } from 'contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';

interface SubmitProps {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);

  async function handleSignIn(data: SubmitProps) {
    try {
      await signIn(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSignIn)}>
      <input type="text" placeholder="Email" {...register('email')} />
      <input type="password" placeholder="Senha" {...register('password')} />
      <button>Fazer login</button>
    </form>
  );
};

export default Login;

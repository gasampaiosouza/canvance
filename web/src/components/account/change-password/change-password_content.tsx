import { sendPasswordMail } from '@/modules/send-password-email';
import { CompletedIcon, ForgotPasswordContainer, UncompletedIcon } from './styles';

import Link from 'next/link';
import { toast } from 'react-toastify';

interface ChangePasswordProps {
  email: string;
  success: boolean;
}

const ChangePasswordContent: React.FC<ChangePasswordProps> = ({ success, email }) => {
  async function resendPasswordEmail() {
    const config = {
      pending: 'Reenviando email...',
      success: 'Email reenviado com sucesso!',
      error: 'Não foi possível reenviar o email, tente novamente mais tarde.',
    };

    toast.promise(() => sendPasswordMail(email), config);
  }

  return (
    <ForgotPasswordContainer>
      {success ? (
        <>
          <CompletedIcon />

          <p>
            Enviamos um email para <br /> <strong>{email}</strong> <br /> para a alteração
            da senha.
          </p>

          <span>
            Não recebeu o email? <a onClick={resendPasswordEmail}>Clique aqui</a> para
            reenviar
          </span>
        </>
      ) : (
        <>
          <UncompletedIcon />

          <p>
            Deu algo errado ao tentar enviar o email para <br />
            <strong>{email}</strong>, <br /> tente novamente mais tarde.
          </p>

          <Link href="/account">
            <a className="default-button">Voltar</a>
          </Link>
        </>
      )}
    </ForgotPasswordContainer>
  );
};

export default ChangePasswordContent;

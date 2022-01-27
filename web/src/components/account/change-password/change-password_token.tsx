import React from 'react';

import { ChangePasswordForm } from './styles';
import { Input, InputContainer, PageBottom } from 'components/admin-content/styles';

import Link from 'next/link';
import { ErrorMessage } from 'components/error-message';
import { toast } from 'react-toastify';
import api from 'services/api';
import { useAuth } from 'hooks/useAuth';
import router from 'next/router';
import { AxiosError } from 'axios';

interface FormProps {
  password: string;
  confirmPassword: string;
}

interface IProps {
  token: string;
}

const ChangePasswordTokenContent: React.FC<IProps> = ({ token }) => {
  const [formData, setFormData] = React.useState({} as FormProps);
  const [formErrors, setFormErrors] = React.useState({} as FormProps);

  const { user } = useAuth();

  const handleFormValidation = async () => {
    const isValid = isFormValid();

    if (!isValid) return;

    try {
      await api.post('/auth/reset_password', {
        email: user?.email,
        token,
        password: formData.password,
      });

      toast.success('Senha alterada com sucesso!');

      router.push('/account');
    } catch (err: any) {
      const error = err.response.data;

      console.log(error);

      if (error.error_message == 'token.invalid') {
        toast.error('O seu token expirou!');

        return router.push('/account');
      }

      toast.error('Ocorreu um erro ao tentar alterar a senha.');
    }
  };

  const isFormValid = () => {
    const errors = {} as FormProps;

    if (!formData.password) {
      errors.password = 'Campo obrigatório';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'As senhas devem ser iguais';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  return (
    <>
      <ChangePasswordForm>
        <InputContainer label="Senha nova">
          <Input
            type="password"
            onChange={(ev) =>
              setFormData((prev) => ({ ...prev, password: ev.target.value }))
            }
          />

          {formErrors?.password && <ErrorMessage message={formErrors.password || ''} />}
        </InputContainer>

        <InputContainer label="Confirme a senha nova">
          <Input
            type="password"
            onChange={(ev) =>
              setFormData((prev) => ({ ...prev, confirmPassword: ev.target.value }))
            }
          />

          {formErrors?.confirmPassword && (
            <ErrorMessage message={formErrors.confirmPassword || ''} />
          )}
        </InputContainer>
      </ChangePasswordForm>

      <PageBottom>
        <button className="change-password" onClick={handleFormValidation}>
          Alterar senha
        </button>

        <Link href="/account">
          <a className="change-password_cancel">Cancelar</a>
        </Link>
      </PageBottom>
    </>
  );
};

export default ChangePasswordTokenContent;

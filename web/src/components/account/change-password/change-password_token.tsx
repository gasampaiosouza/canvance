import React from 'react';

import { ChangePasswordForm } from '../styles';
import { Input, InputContainer } from 'components/admin-content/styles';

import { toast } from 'react-toastify';
import api from 'services/api';
import router from 'next/router';
import { Description, SubmitButton, Title } from 'components/login/styles';

interface FormProps {
  password: string;
  confirmPassword: string;
}

interface IProps {
  token: string;
  email: string;
}

const ChangePasswordTokenContent: React.FC<IProps> = ({ token, email }) => {
  const [formData, setFormData] = React.useState({} as FormProps);

  const handleFormValidation = async () => {
    const { isValid } = isFormValid();

    if (!isValid) return;

    try {
      const data = { email, token, password: formData.password };

      await api.post('/auth/reset_password', data);

      toast.success('Senha alterada com sucesso!');

      router.push('/account');
    } catch (err: any) {
      const error = err.response.data;

      console.log(error);

      if (error.error_message == 'token.invalid') {
        toast.error('O token da senha expirou, tente novamente.');

        return router.push('/account/change-password');
      }

      toast.error('Ocorreu um erro ao tentar alterar a senha.');
    }
  };

  const isFormValid = () => {
    if (!formData.password || !formData.confirmPassword) {
      toast.error('Preencha todos os campos');
      return { isValid: false };
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('As senhas devem ser iguais');
      return { isValid: false };
    }

    if (formData.password.length < 6) {
      toast.error('A senha deve ter ao menos 6 caracteres');
      return { isValid: false };
    }

    return { isValid: true };
  };

  return (
    <ChangePasswordForm>
      <div className="content">
        <div>
          <Title className="token-title">Alteração de senha</Title>
          <Description className="token-description">
            Digite e confirme sua senha para realizar a alteração
          </Description>
        </div>

        <InputContainer label="Senha nova">
          <Input
            type="password"
            onChange={(ev) =>
              setFormData((prev) => ({ ...prev, password: ev.target.value }))
            }
          />
        </InputContainer>

        <InputContainer label="Confirme a senha nova">
          <Input
            type="password"
            onChange={(ev) =>
              setFormData((prev) => ({ ...prev, confirmPassword: ev.target.value }))
            }
          />
        </InputContainer>

        <SubmitButton className="token-submit" onClick={handleFormValidation}>
          Alterar senha
        </SubmitButton>
      </div>
    </ChangePasswordForm>
  );
};

export default ChangePasswordTokenContent;

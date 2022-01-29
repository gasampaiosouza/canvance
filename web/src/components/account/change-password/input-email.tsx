import React from 'react';
import { InputEmailContainer } from '../styles';

import { Email } from '@styled-icons/material-rounded';

import { useState } from 'react';
import { Form, Input, InputContainer, SubmitButton } from 'components/login/styles';

import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { sendPasswordMail } from '@/modules/send-password-email';

interface Props {
  defaultEmail: string;
}

const InputEmailToChangePassword: React.FC<Props> = ({ defaultEmail }) => {
  const { query, back } = useRouter();

  const [userEmail, setUserEmail] = useState(query.userEmail as string);
  const [buttonText, setButtonText] = useState('Enviar');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setButtonText('Enviando...');

    event.preventDefault();
    event.stopPropagation();

    const response = await sendPasswordMail(defaultEmail || userEmail);

    if (!response.success) {
      toast.error('Erro ao enviar email, tente novamente mais tarde.');
      setButtonText('Enviar');
      return;
    }

    toast.success('Email enviado com sucesso!');
    setButtonText('Enviado!');

    setTimeout(() => setButtonText('Enviar'), 3000);
  }

  return (
    <InputEmailContainer>
      <div className="content">
        <h2>Alteração de senha</h2>
        <p>Para continuar, digite um email para receber o código de recuperação</p>

        <Form onSubmit={(event) => handleSubmit(event)}>
          <InputContainer>
            <div className="icon">
              <Email />
            </div>

            <Input
              type="email"
              placeholder="Digite seu email"
              value={userEmail}
              onChange={(ev) => setUserEmail(ev.target.value)}
            />
          </InputContainer>

          <SubmitButton>{buttonText}</SubmitButton>
          <a href="#" onClick={back} className="back-button">
            Voltar
          </a>
        </Form>
      </div>
    </InputEmailContainer>
  );
};

export default InputEmailToChangePassword;

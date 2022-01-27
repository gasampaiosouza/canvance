import React from 'react';
import { InputEmailContainer } from '../styles';

import { Email } from '@styled-icons/material-rounded';

import { useState } from 'react';
import { Form, Input, InputContainer, SubmitButton } from 'components/login/styles';

import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const InputEmailToChangePassword = () => {
  const { query, back } = useRouter();

  const [userEmail, setUserEmail] = useState(query.userEmail as string);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();

    console.log({ userEmail });
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

          <SubmitButton>Enviar</SubmitButton>
          <a href="#" onClick={back} className="back-button">
            Voltar
          </a>
        </Form>
      </div>
    </InputEmailContainer>
  );
};

export default InputEmailToChangePassword;

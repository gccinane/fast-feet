import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { useDispatch } from 'react-redux';
import { signInRequest } from '~/store/modules/auth/actions';
import logo from '~/assets/fastfeet-logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Digite um email válido')
    .required('Email é obrigatório'),
  password: Yup.string()
    .min(6, 'Senha com mínimo de 6 dígitos')
    .required('Senha é obrigatória'),
});

function SignIn() {
  const dispatch = useDispatch();

  function handleSubmit(email, password) {
    dispatch(signInRequest(email, password));
  }
  return (
    <>
      <img src={logo} alt="fast-feet" />
      <Form onSubmit={handleSubmit} schema={schema}>
        <p>SEU E-MAIL</p>
        <Input placeholder="exemplo@gmail.com" name="email" type="email" />
        <p>SUA SENHA</p>
        <Input placeholder="Senha secreta" name="password" type="password" />

        <button type="submit">Enviar</button>
      </Form>
    </>
  );
}

export default SignIn;

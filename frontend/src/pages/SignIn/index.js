import React from 'react';
import { Form, Input } from '@rocketseat/unform';

import logo from '~/assets/fastfeet-logo.png';

function SignIn() {
  return (
    <>
      <img src={logo} alt="fast-feet" />
      <Form>
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

import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { FiCheck, FiChevronLeft } from 'react-icons/fi';
import * as Yup from 'yup';
import { Container, SaveButton } from './styles';

export default function AddOrder() {
  return (
    <Container>
      <div>
        <h1>Cadastro de entregadores</h1>
        <button type="button">
          <FiChevronLeft size={20} color="#000" />
          voltar
        </button>
        <SaveButton type="button">
          <FiCheck size={20} color="#eee" />
          SALVAR
        </SaveButton>
      </div>
      <Form>
        <Input name="avatar" type="file" />
        <Input name="name" type="text" placeholder="Digite seu nome" />
        <Input name="email" type="email" placeholder="Digite seu email" />
      </Form>
    </Container>
  );
}

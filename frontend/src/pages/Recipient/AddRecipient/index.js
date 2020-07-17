import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { FiCheck, FiChevronLeft, FiImage } from 'react-icons/fi';
import * as Yup from 'yup';
import api from '~/services/api';
import { Container, SaveButton, BackButton } from './styles';
import history from '~/services/history';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string().required('O email é obrigatório'),
});

export default function AddDeliveryman() {
  function handleNavigateBack() {
    return history.push('/recipient');
  }

  function handleImage() {}

  function handleSubmit(email, password) {
    try {
      api.post('deliverymen', email, password);
    } catch (error) {
      console.tron.log('ay mi amor');
    }
  }

  return (
    <Container>
      <div>
        <h1>Cadastro de entregadores</h1>
        <BackButton type="button" onClick={handleNavigateBack}>
          <FiChevronLeft size={20} color="#fff" />
          VOLTAR
        </BackButton>

        <SaveButton type="submit" form="createdeliveryman">
          <FiCheck size={20} color="#eee" />
          SALVAR
        </SaveButton>
      </div>
      <Form schema={schema} onSubmit={handleSubmit} id="createdeliveryman">
        <label htmlFor="avatar">
          <FiImage size={50} color="#d2d2d2" />
          Adicionar foto
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={handleImage}
          />
        </label>
        <p>Nome</p>
        <Input name="name" type="text" placeholder="Digite seu nome" />
        <p>Email</p>
        <Input name="email" type="email" placeholder="Digite seu email" />
      </Form>
    </Container>
  );
}

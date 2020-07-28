import React, { useEffect, useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';
import { FiCheck, FiChevronLeft } from 'react-icons/fi';

import * as Yup from 'yup';

import api from '~/services/api';
import {
  Container,
  SaveButton,
  BackButton,
  StreetInputDescription,
  StateInputDescription,
} from './styles';
import history from '~/services/history';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  street: Yup.string().required('A rua é obrigatória'),
  street_number: Yup.number().required('O número é obrigatório'),
  street_complement: Yup.string(),
  city: Yup.string().required('A cidade é obrigatória'),
  state: Yup.string().required('O estado é obrigatório'),
  zip_code: Yup.string()
    .required('O CEP é obrigatório')
    .min(8, 'CEP tem de ter 8 dígitos'),
});

export default function RecipientForm({ match }) {
  const { id } = match.params;
  const [recipient, setRecipient] = useState([]);

  useEffect(() => {
    async function loadRecipient() {
      if (id) {
        const response = await api.get(`recipients/${id}`);
        setRecipient(response.data);
      }
    }

    loadRecipient();
  }, []);
  function handleNavigateBack() {
    return history.push('/recipient');
  }

  function handleSubmit(data) {
    try {
      if (id) {
        api.put(`recipients/${id}`, data);
      } else {
        api.post('recipients', data);
      }
    } catch (error) {
      console.tron.log('error');
    }
  }

  return (
    <Container>
      <div>
        {id ? (
          <h1>Edição de destinatários</h1>
        ) : (
          <h1>Cadastro de destinatários</h1>
        )}
        <BackButton type="button" onClick={handleNavigateBack}>
          <FiChevronLeft size={20} color="#fff" />
          VOLTAR
        </BackButton>

        <SaveButton type="submit" form="createrecipient">
          <FiCheck size={20} color="#eee" />
          SALVAR
        </SaveButton>
      </div>
      <Form
        schema={schema}
        onSubmit={handleSubmit}
        id="createrecipient"
        initialData={recipient}
      >
        <p>Nome</p>
        <Input name="name" type="text" />

        <StreetInputDescription>
          <p>Rua</p>
          <p>Número</p>
          <p>Complemento</p>
        </StreetInputDescription>
        <div id="streetInputs">
          <Input name="street" type="text" />

          <Input name="street_number" type="text" />

          <Input name="address_complement" type="text" />
        </div>
        <StateInputDescription>
          <p>Cidade</p>
          <p>Estado</p>
          <p>CEP</p>
        </StateInputDescription>
        <div id="stateInputs">
          <Input name="city" type="text" />
          <Input name="state" type="text" />
          <Input name="zip_code" type="text" />
        </div>
      </Form>
    </Container>
  );
}

RecipientForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
};

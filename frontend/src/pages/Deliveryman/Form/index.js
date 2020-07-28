import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { Form } from '@unform/web';
import { FiCheck, FiChevronLeft } from 'react-icons/fi';
import { Container, SaveButton, BackButton } from './styles';
import Input from '~/components/Input';
import AvatarInput from './AvatarInput';

import api from '~/services/api';
import history from '~/services/history';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string().required('O email é obrigatório'),
});

export default function DeliverymanForm({ match }) {
  const { id } = match.params;
  const [deliveryman, setDeliveryman] = useState(null);
  const [photoUrl, setPhotoUrl] = useState('');
  useEffect(() => {
    async function loadDeliveryman() {
      if (id) {
        const response = await api.get(`deliverymen/${id}`);
        setDeliveryman(response.data);
        setPhotoUrl(response.data.avatar.url);
      }
    }

    loadDeliveryman();
  }, [id]);

  function handleNavigateBack() {
    return history.push('/deliveryman');
  }

  function handleSubmit(data) {
    try {
      if (id) {
        api.put(`deliverymen/${id}`, data);
      } else {
        api.post('deliverymen', data);
      }
    } catch (error) {
      console.tron.log(error);
    }
  }

  return (
    <Container>
      <div>
        {id ? (
          <h1>Edição de entregadores</h1>
        ) : (
          <h1>Cadastro de entregadores</h1>
        )}
        <BackButton type="button" onClick={handleNavigateBack}>
          <FiChevronLeft size={20} color="#fff" />
          VOLTAR
        </BackButton>

        <SaveButton type="submit" form="createdeliveryman">
          <FiCheck size={20} color="#eee" />
          SALVAR
        </SaveButton>
      </div>

      <Form
        schema={schema}
        onSubmit={handleSubmit}
        id="createdeliveryman"
        initialData={deliveryman || undefined}
      >
        <AvatarInput name="avatar_id" currentAvatar={photoUrl} />
        <p>Nome</p>
        <Input name="name" placeholder="Digite seu nome" />
        <p>Email</p>
        <Input name="email" placeholder="Digite seu email" />
      </Form>
    </Container>
  );
}
DeliverymanForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
};

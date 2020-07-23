import React, { useEffect, useState, useMemo } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { FiCheck, FiChevronLeft } from 'react-icons/fi';
import Select from 'react-select';
import { Form, Input } from '@rocketseat/unform';
import { Container, SaveButton, BackButton, SelectContainer } from './styles';

import api from '~/services/api';
import history from '~/services/history';

const schema = Yup.object().shape({
  product: Yup.string().required('O nome do produto é obrigatório'),
});

const selectStyles = {
  option: (base, state) => ({
    ...base,
    color: state.isSelected ? '#eee' : '#999',
    padding: 10,
  }),
  control: () => ({
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '0 7px',
    height: 36,
    width: '92%',
    textAlign: 'left',
  }),
  container: (base) => ({
    ...base,
    width: 390,
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
  }),
  dropdownIndicator: (base) => ({
    ...base,
    position: 'absolute',
    background: '#7159c1',
    borderRadius: '4px',
    right: 0,
    top: 0,
  }),
};

export default function DeliveryForm({ match }) {
  const { id } = match.params;
  const [deliverymen, setDeliverymen] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState([]);
  const [selectedDeliveryman, setSelectedDeliveryman] = useState([]);
  const [deliveryName, setDeliveryName] = useState('');

  useEffect(() => {
    async function loadDeliveries() {
      try {
        const [deliverymenResponse, recipientsResponse] = await Promise.all([
          api.get('deliverymen'),
          api.get('recipients'),
        ]);
        setDeliverymen(deliverymenResponse.data);
        setRecipients(recipientsResponse.data);

        if (id) {
          const response = await api.get(`orders/${id}`);
          const { deliveryman, recipient, product } = response.data;
          setDeliveryName(product);
          setSelectedDeliveryman(deliveryman);
          setSelectedRecipient(recipient);
        }
      } catch (error) {
        console.tron.log(error);
      }
    }

    loadDeliveries();
  }, []);

  const deliverymenOptions = useMemo(() => {
    return deliverymen.map((deliveryman) => ({
      value: deliveryman,
      label: deliveryman.name,
    }));
  }, [deliverymen]);

  const recipientsOptions = useMemo(() => {
    return recipients.map((recipient) => ({
      value: recipient,
      label: recipient.name,
    }));
  }, [recipients]);

  function handleNavigateBack() {
    return history.push('/delivery');
  }

  function handleSubmit(data) {
    try {
      if (id) {
        api.put(`orders/${id}`, {
          recipient_id: String(selectedRecipient.id),
          deliveryman_id: String(selectedDeliveryman.id),
          product: data.product,
        });
      } else {
        api.post('orders', {
          recipient_id: selectedRecipient.id,
          deliveryman_id: selectedDeliveryman.id,
          product: data.product,
        });
      }
    } catch (error) {
      console.tron.log(error);
    }
  }

  function handleDeliveryman(selectedOption) {
    const { value } = selectedOption;
    return setSelectedDeliveryman(value);
  }

  function handleRecipient(selectedOption) {
    const { value } = selectedOption;
    return setSelectedRecipient(value);
  }

  return (
    <Container>
      {!id ? (
        <div id="subheader">
          <h1>Cadastro de encomendas</h1>
          <BackButton type="button" onClick={handleNavigateBack}>
            <FiChevronLeft size={20} color="#fff" />
            VOLTAR
          </BackButton>

          <SaveButton type="submit" form="createdelivery">
            <FiCheck size={20} color="#eee" />
            SALVAR
          </SaveButton>
        </div>
      ) : (
        <div id="subheader">
          <h1>Edição de encomendas</h1>
          <BackButton type="button" onClick={handleNavigateBack}>
            <FiChevronLeft size={20} color="#fff" />
            VOLTAR
          </BackButton>

          <SaveButton type="submit" form="createdelivery">
            <FiCheck size={20} color="#eee" />
            SALVAR
          </SaveButton>
        </div>
      )}

      <Form schema={schema} onSubmit={handleSubmit} id="createdelivery">
        <div id="description">
          <p>Destinatário</p>
          <p>Entregador</p>
        </div>
        <SelectContainer>
          <Select
            options={recipientsOptions}
            styles={selectStyles}
            isSearchable={false}
            value={{
              value: selectedRecipient,
              label: selectedRecipient.name,
            }}
            name="recipient"
            onChange={(selectedOption) => handleRecipient(selectedOption)}
          />

          <Select
            options={deliverymenOptions}
            styles={selectStyles}
            isSearchable={false}
            name="deliveryman"
            value={{
              value: selectedDeliveryman,
              label: selectedDeliveryman.name,
            }}
            onChange={(selectedOption) => handleDeliveryman(selectedOption)}
          />
        </SelectContainer>

        <p>Produto</p>
        <Input
          name="product"
          type="text"
          placeholder={id ? deliveryName : 'Ex: Notebook'}
        />
      </Form>
    </Container>
  );
}

DeliveryForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
};

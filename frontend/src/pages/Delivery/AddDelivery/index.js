import React, { useEffect, useState, useMemo } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { FiCheck, FiChevronLeft } from 'react-icons/fi';
import * as Yup from 'yup';
import Select from 'react-select';
import api from '~/services/api';
import { Container, SaveButton, BackButton, SelectContainer } from './styles';
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

export default function AddDelivery() {
  const [deliverymen, setDeliverymen] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [selectedDeliveryman, setSelectedDeliveryman] = useState('');

  useEffect(() => {
    async function loadDeliveries() {
      try {
        const [deliverymenResponse, recipientsResponse] = await Promise.all([
          api.get('deliverymen'),
          api.get('recipients'),
        ]);
        setDeliverymen(deliverymenResponse.data);
        setRecipients(recipientsResponse.data);
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
      api.post('orders', {
        recipient_id: selectedRecipient,
        deliveryman_id: selectedDeliveryman,
        product: data.product,
      });
    } catch (error) {
      console.tron.log(error);
    }
  }

  function handleDeliveryman(event) {
    console.tron.log(event);

    return setSelectedDeliveryman(event.value.id);
  }

  function handleRecipient(event) {
    return setSelectedRecipient(event.value.id);
  }

  return (
    <Container>
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
            name="recipient"
            onChange={(event) => handleRecipient(event)}
            placeholder="deus"
          />

          <Select
            options={deliverymenOptions}
            name="deliveryman"
            onChange={(event) => handleDeliveryman(event)}
            styles={selectStyles}
            isSearchable={false}
          />
        </SelectContainer>

        <p>Produto</p>
        <Input
          name="product"
          type="text"
          placeholder="Digite o nome do produto"
        />
      </Form>
    </Container>
  );
}

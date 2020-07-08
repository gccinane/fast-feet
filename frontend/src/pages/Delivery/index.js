import React, { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import {
  Container,
  DeliveryTable,
  DeliveryStatus,
  DeliverymanAvatar,
  DeliverymanInitialLetters,
  AddDeliveryButton,
  FilterDelivery,
} from './styles';
import api from '~/services/api';

function Delivery() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    async function loadDeliveries() {
      try {
        const response = await api.get('orders');
        setDeliveries(response.data);
      } catch (error) {
        console.tron.log(error);
      }
    }

    loadDeliveries();
  }, []);

  return (
    <Container>
      <header>
        <h1>Gerenciando encomendas</h1>
        <div>
          <FilterDelivery
            type="search"
            name="delivery"
            placeholder="Buscar por encomendas"
          />
          <AddDeliveryButton type="button">
            <FiPlus size={24} color="#eee" style={{ marginRight: '4px' }} />
            CADASTRAR
          </AddDeliveryButton>
        </div>
      </header>
      <DeliveryTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Destinatário</th>
            <th>Entregador</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map(({ deliveryman, recipient, ...delivery }) => (
            <tr key={String(delivery.id)}>
              <td>{delivery.id}</td>
              <td>{delivery.product}</td>
              <td>
                <DeliverymanAvatar>
                  <DeliverymanInitialLetters>DJ</DeliverymanInitialLetters>
                  {deliveryman.name}
                </DeliverymanAvatar>
              </td>
              <td>{recipient.city}</td>
              <td>{recipient.state}</td>
              <td>
                <DeliveryStatus>
                  <figure />
                  CAMINHA
                </DeliveryStatus>
              </td>
              <td>
                <button type="button">...</button>
              </td>
            </tr>
          ))}
        </tbody>
      </DeliveryTable>
    </Container>
  );
}

export default Delivery;

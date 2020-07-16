import React, { useState, useEffect } from 'react';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import {
  Container,
  DeliveryStatus,
  DeliverymanAvatar,
  DeliverymanInitialLetters,
  PageButton,
} from './styles';
import Table from '~/components/Table';
import SubHeader from '~/components/SubHeader';

import api from '~/services/api';

function Delivery() {
  const [deliveries, setDeliveries] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const letterAvatar = [
    '#F4EFFC',
    '#FCF4EE',
    '#EBFBFA',
    '#FFEEF1',
    '#F4F9EF',
    '#FCFCEF',
  ];

  function setDeliverymanInitialLetters(name) {
    const splittedName = name.split(' ');

    const initialLetters =
      splittedName.length !== 1
        ? (splittedName[0].charAt(0) + splittedName[1].charAt(1)).toUpperCase()
        : (splittedName[0].charAt(0) + splittedName[0].charAt(1)).toUpperCase();

    return initialLetters;
  }

  function setDeliveryStatus(delivery) {
    if (delivery.canceled_at) {
      return { text: 'CANCELADA', background: '#FAB0B0', color: '#DE3B3B' };
    }

    if (delivery.end_date) {
      return { text: 'ENTREGUE', background: '#DFF0DF', color: '#2CA42B' };
    }

    if (delivery.start_date) {
      return { text: 'RETIRADA', background: '#BAD2FF', color: '#4D85EE' };
    }

    return {
      text: 'PENDENTE',
      background: '#F0F0DF',
      color: '#C1BC35',
    };
  }

  function incrementPage() {
    return setPage(page + 1);
  }

  function decrementPage() {
    return setPage(page - 1);
  }

  useEffect(() => {
    async function loadDeliveries() {
      setLoading(true);
      const response = await api.get(`orders?q=${search}`, {
        params: {
          page,
        },
      });
      const parsedDeliveries = response.data.map((delivery) => ({
        ...delivery,
        status: setDeliveryStatus(delivery),
        deliverymanInitialLetters: setDeliverymanInitialLetters(
          delivery.deliveryman.name
        ),
      }));
      setDeliveries(parsedDeliveries);
      setLoading(false);
    }

    loadDeliveries();
  }, [search, page]);

  return (
    <Container>
      <SubHeader
        search={search}
        setSearch={setSearch}
        placeholder="Buscar por encomendas"
        title="Gerenciar encomendas"
      />
      {loading ? (
        <h1>LOADING</h1>
      ) : (
        <>
          <Table>
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
              {deliveries.map(
                ({ deliveryman, recipient, status, ...delivery }) => (
                  <tr key={String(delivery.id)}>
                    <td>{delivery.id}</td>
                    <td>{delivery.product}</td>
                    <td>
                      <DeliverymanAvatar>
                        <DeliverymanInitialLetters
                          color={
                            letterAvatar[
                              delivery.deliverymanInitialLetters.length %
                                delivery.id
                            ]
                          }
                        >
                          {delivery.deliverymanInitialLetters}
                        </DeliverymanInitialLetters>
                        {deliveryman.name}
                      </DeliverymanAvatar>
                    </td>
                    <td>{recipient.city}</td>
                    <td>{recipient.state}</td>
                    <td>
                      <DeliveryStatus
                        background={status.background}
                        color={status.color}
                      >
                        <figure />
                        {status.text}
                      </DeliveryStatus>
                    </td>
                    <td>
                      <button type="button">...</button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
          <div id="pageButtons">
            <PageButton firstpage={page === 1} onClick={decrementPage}>
              <FiArrowLeft size={24} />
            </PageButton>

            <PageButton onClick={incrementPage}>
              <FiArrowRight size={24} />
            </PageButton>
          </div>
        </>
      )}
    </Container>
  );
}

export default Delivery;

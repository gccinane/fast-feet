import React, { useState, useEffect } from 'react';

import { FiEdit2, FiTrash, FiEye } from 'react-icons/fi';
import { format, parseISO } from 'date-fns';
import Actions from '~/components/Actions';
import Table from '~/components/Table';
import SubHeader from '~/components/SubHeader';
import Pagination from '~/components/Pagination';
import Detail from './Detail';

import api from '~/services/api';
import history from '~/services/history';

import {
  Container,
  DeliveryStatus,
  DeliverymanAvatar,
  DeliverymanInitialLetters,
} from './styles';

const actionIcons = [FiEye, FiTrash, FiEdit2];
const iconcolors = ['#7159c1', '#a21', '#000'];

function Delivery() {
  const [deliveries, setDeliveries] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [deliveryDetail, setDeliveryDetail] = useState({});
  const [visible, setVisible] = useState(false);
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

  function handleVisible() {
    setVisible(!visible);
  }

  function handleDetails(delivery, deliveryman, recipient) {
    setDeliveryDetail(delivery, deliveryman, recipient);
    handleVisible();
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
        street_number: `${delivery.recipient.street}, ${delivery.recipient.street_number}`,
        city_state: `${delivery.recipient.city} - ${delivery.recipient.state}`,
        start_date_formatted: delivery.start_date
          ? format(parseISO(delivery.start_date), 'dd/MM/yyyy')
          : null,
        end_date_formatted: delivery.end_date
          ? format(parseISO(delivery.end_date), 'dd/MM/yyyy')
          : null,
        deliverymanInitialLetters: setDeliverymanInitialLetters(
          delivery.deliveryman.name
        ),
      }));
      setDeliveries(parsedDeliveries);
      setLoading(false);
    }

    loadDeliveries();
  }, [search, page]);

  function handleNavigateUpdate(id) {
    history.push({
      pathname: `/delivery/update/${id}`,
    });
  }

  async function handleDelete(id) {
    try {
      if (window.confirm('Você realmente deseja deletar esta encomenda?')) {
        await api.delete(`orders/${id}`);
      }
    } catch (error) {
      console.tron.log(error);
    }
  }

  return (
    <Container>
      <SubHeader
        search={search}
        setSearch={setSearch}
        placeholder="Buscar por encomendas"
        title="Gerenciar encomendas"
        navigateTo="delivery/create"
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
                    <td>#{delivery.id}</td>
                    <td>{recipient.name}</td>
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
                      <Actions
                        icons={actionIcons}
                        description={['Visualizar', 'Deletar', 'Editar']}
                        colors={iconcolors}
                        id={delivery.id}
                        handlers={[
                          () => handleDetails(delivery, deliveryman, recipient),
                          handleDelete,
                          handleNavigateUpdate,
                        ]}
                      />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
          <Pagination page={page} handlePage={setPage} />

          <Detail delivery={deliveryDetail} visible={visible} />
        </>
      )}
    </Container>
  );
}

export default Delivery;

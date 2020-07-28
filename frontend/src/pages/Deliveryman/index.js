import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash } from 'react-icons/fi';
import api from '~/services/api';
import history from '~/services/history';

import {
  Container,
  DeliverymanAvatar,
  DeliverymanInitialLetters,
} from './styles';

import Table from '~/components/Table';
import SubHeader from '~/components/SubHeader';
import Actions from '~/components/Actions';

const actionIcons = [FiEdit2, FiTrash];
const iconcolors = ['#7159c1', '#a21'];

const letterAvatar = [
  '#F4EFFC',
  '#FCF4EE',
  '#EBFBFA',
  '#FFEEF1',
  '#F4F9EF',
  '#FCFCEF',
];

function Deliveryman() {
  const [deliverymen, setDeliverymen] = useState([]);
  const [search, setSearch] = useState('');

  function setDeliverymanInitialLetters(name) {
    const splittedName = name.split(' ');

    const initialLetters =
      splittedName.length !== 1
        ? (splittedName[0].charAt(0) + splittedName[1].charAt(1)).toUpperCase()
        : (splittedName[0].charAt(0) + splittedName[0].charAt(1)).toUpperCase();

    return initialLetters;
  }

  useEffect(() => {
    async function loadDeliverymen() {
      const response = await api.get(`deliverymen?q=${search}`);
      const parsedDeliveryman = response.data.map((deliveryman) =>
        deliveryman.avatar_id === null
          ? {
              ...deliveryman,
              initialLetters: setDeliverymanInitialLetters(deliveryman.name),
            }
          : { ...deliveryman }
      );
      setDeliverymen(parsedDeliveryman);
    }

    loadDeliverymen();
  }, [search]);

  function handleUpdateDeliveryman(id) {
    history.push({ pathname: `deliveryman/update/${id}` });
  }
  async function handleDeleteDeliveryman(id) {
    try {
      if (window.confirm('Deseja realmente excluir este entregador?')) {
        await api.delete(`deliverymen/${id}`);
        setDeliverymen(
          deliverymen.filter((deliveryman) => deliveryman.id !== id)
        );
      }
    } catch (error) {
      console.tron.log(error);
    }
  }

  return (
    <Container>
      <SubHeader
        placeholder="Buscar por entregadores"
        title="Gerenciar entregadores"
        search={search}
        setSearch={setSearch}
        navigateTo="deliveryman/create"
      />
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Foto</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {deliverymen.map((deliveryman) => (
            <tr key={String(deliveryman.id)}>
              <td>#{deliveryman.id}</td>
              <td>
                {deliveryman.avatar_id === null ? (
                  <DeliverymanAvatar>
                    <DeliverymanInitialLetters
                      color={
                        letterAvatar[
                          deliveryman.initialLetters.length % deliveryman.id
                        ]
                      }
                    >
                      {deliveryman.initialLetters}
                    </DeliverymanInitialLetters>
                  </DeliverymanAvatar>
                ) : (
                  <img src={deliveryman.avatar.url} alt="Avatar" />
                )}
              </td>
              <td>{deliveryman.name}</td>
              <td>{deliveryman.email}</td>
              <td>
                <Actions
                  icons={actionIcons}
                  colors={iconcolors}
                  handlers={[handleUpdateDeliveryman, handleDeleteDeliveryman]}
                  description={['Editar', 'Excluir']}
                  id={deliveryman.id}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Deliveryman;

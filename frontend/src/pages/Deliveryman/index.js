import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash } from 'react-icons/fi';
import api from '~/services/api';
import history from '~/services/history';

import { Container } from './styles';

import Table from '~/components/Table';
import SubHeader from '~/components/SubHeader';
import Actions from '~/components/Actions';

const actionIcons = [FiEdit2, FiTrash];
const iconcolors = ['#7159c1', '#a21'];

function Deliveryman() {
  const [deliverymen, setDeliverymen] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadDeliverymen() {
      const response = await api.get(`deliverymen?q=${search}`);
      setDeliverymen(response.data);
    }

    loadDeliverymen();
  }, [search]);

  function handleUpdateDeliveryman(id) {
    history.push({ pathname: `deliveryman/update/${id}` });
  }
  function handleDeleteDeliveryman() {
    console.tron.log('deus');
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
                <img src={deliveryman.avatar.url} alt="Avatar" />
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

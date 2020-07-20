import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash, FiEye } from 'react-icons/fi';
import api from '~/services/api';
import { Container } from './styles';

import Table from '~/components/Table';
import SubHeader from '~/components/SubHeader';
import Actions from '~/components/Actions';

const actionIcons = [FiEdit2, FiTrash, FiEye];
const iconcolors = ['#7159c1', '#000', '#a21'];

function Deliveryman() {
  const [deliverymen, setDeliverymen] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadDeliveries() {
      const response = await api.get(`deliverymen?q=${search}`);
      console.tron.log(response.data);
      setDeliverymen(response.data);
    }

    loadDeliveries();
  }, [search]);
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
            <tr>
              <td>#{deliveryman.id}</td>
              <td>{deliveryman.avatar_id}</td>
              <td>{deliveryman.name}</td>
              <td>{deliveryman.email}</td>
              <td>
                <Actions
                  icons={actionIcons}
                  colors={iconcolors}
                  description={['visualizar', 'deletar', 'editar']}
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

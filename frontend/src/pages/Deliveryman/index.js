import React, { useState, useEffect } from 'react';
import api from '~/services/api';
import { Container } from './styles';
import Table from '~/components/Table';
import SubHeader from '~/components/SubHeader';

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
              <td>{deliveryman.avatar.path}</td>
              <td>{deliveryman.name}</td>
              <td>{deliveryman.email}</td>
              <td>...</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Deliveryman;

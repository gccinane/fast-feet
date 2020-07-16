import React, { useState, useEffect } from 'react';
import api from '~/services/api';

import { Container } from './styles';
import Table from '~/components/Table';
import SubHeader from '~/components/SubHeader';

export default function Recipient() {
  const [recipients, setRecipients] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadDeliveries() {
      const response = await api.get(`recipients?q=${search}`);
      const parsedRecipients = response.data.map((recipient) => ({
        ...recipient,
        address: `${recipient.street}, ${recipient.street_number}, ${recipient.city} - ${recipient.state}`,
      }));
      setRecipients(parsedRecipients);
    }

    loadDeliveries();
  }, [search]);
  return (
    <Container>
      <SubHeader
        placeholder="Buscar por destinatários"
        title="Gerenciar destinatários"
        search={search}
        setSearch={setSearch}
      />
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {recipients.map((recipient) => (
            <tr key={String(recipient.id)}>
              <td>#{recipient.id}</td>
              <td>{recipient.name}</td>
              <td>{recipient.address}</td>
              <td>...</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash } from 'react-icons/fi';
import api from '~/services/api';
import history from '~/services/history';

import { Container } from './styles';
import Table from '~/components/Table';
import SubHeader from '~/components/SubHeader';
import Actions from '~/components/Actions';

const iconcolors = ['#7159c1', '#a21'];
const actionIcons = [FiEdit2, FiTrash];

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

  function handleUpdateRecipient(id) {
    history.push({ pathname: `recipient/update/${id}` });
  }

  async function handleDeleteRecipient(id) {
    try {
      if (window.confirm('Deseja realmente excluir este destinatário?')) {
        await api.delete(`recipients/${id}`);
        setRecipients(recipients.filter((recipient) => recipient.id !== id));
      }
    } catch (error) {
      console.tron.log(error);
    }
  }
  return (
    <Container>
      <SubHeader
        placeholder="Buscar por destinatários"
        title="Gerenciar destinatários"
        search={search}
        setSearch={setSearch}
        navigateTo="recipient/create"
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
              <td>
                {' '}
                <Actions
                  icons={actionIcons}
                  colors={iconcolors}
                  handlers={[handleUpdateRecipient, handleDeleteRecipient]}
                  description={['Editar', 'Excluir']}
                  id={recipient.id}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

import React from 'react';
import { Container } from './styles';
import Table from '~/components/Table';
import SubHeader from '~/components/SubHeader';

export default function Recipient() {
  return (
    <Container>
      <SubHeader
        placeholder="Buscar por destinatários"
        title="Gerenciar destinatários"
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
          <tr>
            <td>1</td>
            <td>jd</td>
            <td>Rua 19 norte lote 5 ed Lorys apt 308</td>
            <td>...</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

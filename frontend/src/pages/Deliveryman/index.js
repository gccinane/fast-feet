import React from 'react';

import { Container } from './styles';
import Table from '~/components/Table';
import SubHeader from '~/components/SubHeader';

function Deliveryman() {
  return (
    <Container>
      <SubHeader
        placeholder="Buscar por entregadores"
        title="Gerenciar entregadores"
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
          <tr>
            <td>1</td>
            <td>jd</td>
            <td>john dow</td>
            <td>exemplo@deus.com.br</td>
            <td>...</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default Deliveryman;

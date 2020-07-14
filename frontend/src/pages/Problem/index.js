import React from 'react';
import Table from '~/components/Table';
import SubHeader from '~/components/SubHeader';
import { Container } from './styles';

export default function Problem() {
  return (
    <Container>
      <SubHeader
        placeholder="Buscar por problemas"
        title="Gerenciar problemas"
      />
      <Table>
        <thead>
          <tr>
            <th>Encomenda</th>
            <th>Problema</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              MEU DEUS DO CEU O CU ACONTECEU NO CEU BRUM BRUM BRUM PRA PRA PRA
            </td>
            <td>...</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

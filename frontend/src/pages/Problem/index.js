import React, { useEffect, useState } from 'react';
import api from '~/services/api';

import Table from '~/components/Table';
import { Container } from './styles';

export default function Problem() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    async function loadDeliveries() {
      const response = await api.get(`delivery-problems`);
      console.tron.log(response.data);
      setProblems(response.data);
    }

    loadDeliveries();
  }, []);

  return (
    <Container>
      <h1>Problemas na Entrega</h1>
      <Table>
        <thead>
          <tr>
            <th>Encomenda</th>
            <th>Problema</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((delivery) => (
            <tr key={String(delivery.id)}>
              <td>#{delivery.id}</td>
              <td>{delivery.problems[0].description}</td>
              <td>...</td>
            </tr>
          ))}
          <tr>
            <td>2</td>
            <td>
              eu sou so um homem que hahaha e as vezes mesmo com esse hahaha as
              pessaos se sentem hahaha entao na verdade nao ha hahaha isso é
              amor? baby não me machuque, não me machuque, não mais
            </td>
            <td>...</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

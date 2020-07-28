import React, { useEffect, useState } from 'react';
import { FiTrash, FiEye } from 'react-icons/fi';

import api from '~/services/api';

import Table from '~/components/Table';
import Actions from '~/components/Actions';
import Details from './Details';
import { Container } from './styles';

const actionIcons = [FiEye, FiTrash];
const iconcolors = ['#7159c1', '#a21'];

export default function Problem() {
  const [problems, setProblems] = useState([]);
  const [problemDetail, setProblemDetail] = useState({});
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function loadDeliveries() {
      const response = await api.get(`delivery-problems`);
      setProblems(response.data);
    }

    loadDeliveries();
  }, [problems]);

  function handleVisible() {
    setVisible(!visible);
  }

  function handleDelete(id) {
    try {
      if (window.confirm('Deseja realmente cancelar esta encomenda?')) {
        api.delete(`orders/${id}`);
      }
    } catch (error) {
      console.tron.log(error);
    }
  }

  function handleDetail(problem) {
    setProblemDetail(problem);
    handleVisible();
  }

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
          {problems.map((problem) => (
            <tr key={String(problem.id)}>
              <td>#{problem.id}</td>
              <td>{problem.description}</td>
              <td>
                {' '}
                <Actions
                  icons={actionIcons}
                  description={['Visualizar', 'Cancelar Encomenda']}
                  colors={iconcolors}
                  id={problem.id}
                  handlers={[() => handleDetail(problem), handleDelete(id)]}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Details problem={problemDetail} visible={visible} />
    </Container>
  );
}

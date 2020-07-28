import React from 'react';
import { Container } from './styles';

export default function Details({ problem, visible }) {
  return (
    <Container visible={visible}>
      <div>
        {' '}
        <strong>Visualizar encomenda</strong>
        <p>{problem.description}</p>
      </div>
    </Container>
  );
}

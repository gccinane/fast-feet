import React from 'react';
import { Container } from './styles';

export default function Details({ delivery, visible }) {
  return (
    <Container visible={visible}>
      <div>
        <strong>Visualizar encomenda</strong>
        <p>{delivery.street_number}</p>
        <p>{delivery.city_state}</p>
        <p>{delivery.zip_code}</p>
        <strong>Datas</strong>
        <p>Retirada: {delivery.start_date_formatted}</p>
        <p>Entrega: {delivery.end_date_formatted}</p>
      </div>
    </Container>
  );
}

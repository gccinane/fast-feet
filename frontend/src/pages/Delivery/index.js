import React from 'react';
import { FaSearch } from 'react-icons/fa';
import {
  Container,
  DeliveryTable,
  DeliveryStatus,
  DeliverymanAvatar,
  DeliverymanInitialLetters,
} from './styles';

function Delivery() {
  return (
    <Container>
      <header>
        <h1>Gerenciando encomendas</h1>
        <div>
          <input
            type="search"
            name="delivery"
            placeholder="Buscar por encomendas"
          />
          <button type="button">CADASTRAR</button>
        </div>
      </header>
      <DeliveryTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Destinatário</th>
            <th>Entregador</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>luis VAN BETHOVEN DO CARAI OW DOIDO</td>
            <td>
              <DeliverymanAvatar>
                <DeliverymanInitialLetters>DJ</DeliverymanInitialLetters>
                DEUS JAVAN
              </DeliverymanAvatar>
            </td>
            <td>chapadao do sul</td>
            <td>MT</td>
            <td>
              <DeliveryStatus>
                <figure />
                CAMINHA
              </DeliveryStatus>
            </td>
            <td>
              <button type="button">...</button>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>luis</td>
            <td>joao</td>
            <td>chapadao do sul</td>
            <td>MT</td>
            <td>a caminho</td>
            <td>...</td>
          </tr>
          <tr>
            <td>1</td>
            <td>luis</td>
            <td>joao</td>
            <td>chapadao do sul</td>
            <td>MT</td>
            <td>a caminho</td>
            <td>...</td>
          </tr>
          <tr>
            <td>1</td>
            <td>luis</td>
            <td>joao</td>
            <td>chapadao do sul</td>
            <td>MT</td>
            <td>a caminho</td>
            <td>...</td>
          </tr>
          <tr>
            <td>1</td>
            <td>luis</td>
            <td>joao</td>
            <td>chapadao do sul</td>
            <td>MT</td>
            <td>a caminho</td>
            <td>...</td>
          </tr>
          <tr>
            <td>1</td>
            <td>luis</td>
            <td>joao</td>
            <td>chapadao do sul</td>
            <td>MT</td>
            <td>a caminho</td>
            <td>...</td>
          </tr>
          <tr>
            <td>1</td>
            <td>luis</td>
            <td>joao</td>
            <td>chapadao do sul</td>
            <td>MT</td>
            <td>a caminho</td>
            <td>...</td>
          </tr>
        </tbody>
      </DeliveryTable>
    </Container>
  );
}

export default Delivery;

import React from 'react';
import { Container } from './styles';
import logo from '~/assets/fastfeet-logo.png';

function Header() {
  return (
    <Container>
      <img src={logo} alt="fastfeet" />
      <button type="button">ENCOMENDAS</button>
      <button type="button">ENTREGADORES</button>
      <button type="button">DESTINATÁRIOS</button>
      <button type="button">PROBLEMAS</button>
      <aside>
        <p>Admin FastFeet</p>
        <button type="button">sair do sistema</button>
      </aside>
    </Container>
  );
}

export default Header;

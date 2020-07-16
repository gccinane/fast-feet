import React from 'react';
import { useDispatch } from 'react-redux';
import { Container, NavButton } from './styles';
import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/fastfeet-logo.png';

function Header() {
  const dispatch = useDispatch();

  function handleLogOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <img src={logo} alt="fastfeet" />
      <nav>
        <NavButton to="/delivery">ENCOMENDAS</NavButton>
        <NavButton to="/deliveryman">ENTREGADORES</NavButton>
        <NavButton to="/recipient">DESTINATÁRIOS</NavButton>
        <NavButton to="/problem">PROBLEMAS</NavButton>
      </nav>

      <aside>
        <p>Admin FastFeet</p>
        <button type="button" onClick={handleLogOut}>
          sair do sistema
        </button>
      </aside>
    </Container>
  );
}

export default Header;

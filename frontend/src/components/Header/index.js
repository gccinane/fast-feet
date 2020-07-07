import React from 'react';
import { useDispatch } from 'react-redux';
import { Container } from './styles';
import { signOut } from '~/store/modules/auth/actions';
import history from '~/services/history';

import logo from '~/assets/fastfeet-logo.png';

function Header() {
  const dispatch = useDispatch();

  function handleNavigate(page) {
    history.push(page);
  }

  function handleLogOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <img src={logo} alt="fastfeet" />
      <nav>
        <button type="button" onClick={() => handleNavigate('/delivery')}>
          ENCOMENDAS
        </button>
        <button type="button" onClick={() => handleNavigate('/deliveryman')}>
          ENTREGADORES
        </button>
        <button type="button" onClick={() => handleNavigate('/recipient')}>
          DESTINATÁRIOS
        </button>
        <button type="button" onClick={() => handleNavigate('/problem')}>
          PROBLEMAS
        </button>
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

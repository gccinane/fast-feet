import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 4px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 0 1px;

  img {
    margin: 22px 12px 0 18px;
    border-right: 1px solid #ababab;
    padding-right: 26px;
    width: 140px;
    height: 24px;
  }

  nav {
    flex: 1;
    margin: 24px 0 4px 0;
  }

  aside {
    margin: 12px;
    display: flex;
    flex-direction: column;

    button {
      margin-top: 8px;
      color: red;
      background: none;
      border: none;
    }
  }
`;

export const NavButton = styled(NavLink).attrs({
  activeStyle: {
    color: '#444',
  },
})`
  font-size: 14px;
  color: #ababab;
  font-weight: bold;
  background: none;
  margin: 0 16px;
  border: none;
`;

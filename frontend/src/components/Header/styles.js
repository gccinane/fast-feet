import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  margin: 4px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 0 1px;

  img {
    margin-top: 45px;
    width: 120px;
    height: 24px;
  }

  button {
    font-size: 12px;
    text-align: left;
    background: none;
    margin: 16px 0;
    border: none;
  }

  aside {
    margin: 24px 16px;
    display: flex;
    flex-direction: column;

    button {
      color: red;
    }
  }
`;

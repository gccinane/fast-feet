import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 12px;
  position: absolute;
  right: 11%;
  background: #fff;
  box-shadow: 0 0 1px;
  border-radius: 4px;
  z-index: 2;

  button {
    display: flex;
    flex-direction: row;
    padding: 7px;

    p {
      margin-left: 10px;
      color: #505050;
      font-size: 16px;
    }
  }

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 11px);
    top: -10px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #7159c1;
  }
`;
